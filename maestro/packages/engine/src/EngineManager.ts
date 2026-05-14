// EngineManager.ts
// Gerencia instâncias de processos BPMN usando bpmn-engine
// Agora integra com MongoDB para persistência de snapshots

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { EventEmitter } from 'events';
import { Engine, Execution } from 'bpmn-engine';
import { SnapshotManager } from './SnapshotManager.js';
import { executePing, type PingResult } from './bpmn-scripts/ping.js';
import { executeEmail, type EmailResult } from './bpmn-scripts/email.js';
import { ProcessInstanceRepository, connectDatabase, type IProcessInstance } from '@maestro/database';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BPMN_DIR = path.join(__dirname, 'bpmn-definitions');

export interface ProcessInstance {
  instanceId: string;
  processName: string;
  bpmnFile: string;
  startedAt: string;
}

export class EngineManager {
  private instances: Map<string, ProcessInstance> = new Map();
  private snapshotManager: SnapshotManager;
  private instanceCounter = 0;
  private activeLoops: Map<string, boolean> = new Map();
  private repository: ProcessInstanceRepository;
  private dbReady: boolean = false;

  constructor(snapshotManager: SnapshotManager) {
    this.snapshotManager = snapshotManager;
    this.repository = new ProcessInstanceRepository();

    // Registra callback para sincronizar snapshots com MongoDB
    this.snapshotManager.setUpdateCallback((instanceId, event, activityId, detail) => {
      this._syncToDatabase(instanceId, event, activityId, detail).catch((err) => {
        console.error(`[EngineManager] Erro ao sincronizar com MongoDB:`, err);
      });
    });

    // Inicializa conexão com MongoDB
    this._initDatabase();
  }

  /**
   * Inicializa a conexão com o MongoDB
   */
  private async _initDatabase(): Promise<void> {
    try {
      await connectDatabase();
      this.dbReady = true;
      console.log('[EngineManager] [OK] MongoDB conectado e pronto');
    } catch (error) {
      console.error('[EngineManager] [WARN] Falha ao conectar MongoDB. Funcionando apenas em memória.', error);
      this.dbReady = false;
    }
  }

  /**
   * Sincroniza uma mudança de snapshot com o MongoDB
   */
  private async _syncToDatabase(
    instanceId: string,
    event: string,
    activityId?: string,
    detail?: string
  ): Promise<void> {
    if (!this.dbReady) return;

    try {
      switch (event) {
        case 'created': {
          // Cria a instância no MongoDB
          const snap = this.snapshotManager.get(instanceId);
          if (!snap) return;
          const instance = this.instances.get(instanceId);
          await this.repository.create({
            instanceId,
            processName: snap.processName,
            bpmnFile: instance?.bpmnFile || 'unknown',
            activities: snap.activities,
          });
          console.log(`[EngineManager] [OK] Instância ${instanceId} salva no MongoDB`);
          break;
        }
        case 'active':
          if (activityId) {
            await this.repository.markActive(instanceId, activityId);
          }
          break;
        case 'completed':
          if (activityId) {
            await this.repository.markCompleted(instanceId, activityId);
          }
          break;
        case 'error':
          if (activityId) {
            await this.repository.markError(instanceId, activityId, detail);
          }
          break;
        case 'processCompleted':
          await this.repository.markProcessCompleted(instanceId);
          console.log(`[EngineManager] [OK] Processo ${instanceId} marcado como concluído no MongoDB`);
          break;
      }
    } catch (error) {
      console.error(`[EngineManager] Erro ao sincronizar ${instanceId}/${event}:`, error);
    }
  }

  /**
   * Lista os arquivos BPMN disponíveis
   */
  listDefinitions(): string[] {
    if (!fs.existsSync(BPMN_DIR)) return [];
    return fs.readdirSync(BPMN_DIR).filter((f: string) => f.endsWith('.bpmn'));
  }

  /**
   * Lê o XML de um arquivo BPMN
   */
  readDefinition(fileName: string): string | null {
    const filePath = path.join(BPMN_DIR, fileName);
    if (!fs.existsSync(filePath)) return null;
    return fs.readFileSync(filePath, 'utf-8');
  }

  private _sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Para o loop de uma instância
   */
  stopInstance(instanceId: string): void {
    this.activeLoops.set(instanceId, false);
    this.snapshotManager.markProcessCompleted(instanceId);
  }

  /**
   * Retorna todas as instâncias ativas
   * Tenta buscar do MongoDB, fallback para memória
   */
  async getInstances(): Promise<ProcessInstance[]> {
    if (this.dbReady) {
      try {
        const dbInstances = await this.repository.findAll();
        return dbInstances.map(doc => ({
          instanceId: doc.instanceId,
          processName: doc.processName,
          bpmnFile: doc.bpmnFile,
          startedAt: doc.startedAt.toISOString(),
        }));
      } catch (error) {
        console.error('[EngineManager] Erro ao buscar instâncias do MongoDB, usando memória:', error);
      }
    }
    return Array.from(this.instances.values());
  }

  /**
   * Retorna instâncias ativas (sincronas, da memória)
   */
  getInstancesSync(): ProcessInstance[] {
    return Array.from(this.instances.values());
  }

   /**
    * Retorna uma instância específica
    */
   getInstance(instanceId: string): ProcessInstance | undefined {
     return this.instances.get(instanceId);
   }

   /**
    * Retorna o status completo de uma instância (do MongoDB)
    */
   async getInstanceStatus(instanceId: string): Promise<any> {
     if (!this.dbReady) {
       throw new Error('MongoDB não conectado');
     }
     return await this.repository.findById(instanceId);
   }

  /**
   * Executa o processo de Ping BPMN
   * Retorna true se o servidor respondeu, false caso contrário
   */
  async executePingProcess(existingInstanceId?: string): Promise<{ success: boolean; result: PingResult }> {
    const instanceId = existingInstanceId || `ping-${++this.instanceCounter}`;

    // Se não é uma instância reutilizada, cria a instância e snapshot
    if (!existingInstanceId) {
      const instance: ProcessInstance = {
        instanceId,
        processName: 'Process_PingServ',
        bpmnFile: 'ping.bpmn',
        startedAt: new Date().toISOString()
      };
      this.instances.set(instanceId, instance);
    }

    // Atividades do processo de ping
    const activities = [
      'StartEvent_Trigger',
      'Task_SendPing',
      'Task_ReceivePing',
      'Gateway_Responded',
      'Task_ReturnMS',
      'EndEvent_Online',
      'EndEvent_Offline'
    ];

    // Recria o snapshot com as atividades reais do ping (substitui o ['start'] genérico)
    this.snapshotManager.create(instanceId, 'Process_PingServ', activities);
    this.snapshotManager.markActive(instanceId, 'StartEvent_Trigger');

    console.log(`[EngineManager] Iniciando processo de ping: ${instanceId}`);

    try {
      // Executa o ping
      const result = await executePing({
        onSendPing: (host) => {
          console.log(`[EngineManager] [SEND] Enviando ping para ${host}...`);
          this.snapshotManager.markCompleted(instanceId, 'StartEvent_Trigger');
          this.snapshotManager.markActive(instanceId, 'Task_SendPing');
        },
        onReceivePing: (result) => {
          console.log(`[EngineManager] [RECV] Resposta do ping recebida`);
          this.snapshotManager.markCompleted(instanceId, 'Task_SendPing');
          this.snapshotManager.markActive(instanceId, 'Task_ReceivePing');
        },
        onPingSuccess: (result) => {
          console.log(`[EngineManager] [OK] Servidor ONLINE - Tempo: ${result.time}ms`);
          this.snapshotManager.markCompleted(instanceId, 'Task_ReceivePing');
          this.snapshotManager.markActive(instanceId, 'Gateway_Responded');
          this.snapshotManager.markActive(instanceId, 'Task_ReturnMS');
        },
        onPingFailed: (result) => {
          console.log(`[EngineManager] [FAIL] Servidor OFFLINE - ${result.error}`);
          this.snapshotManager.markCompleted(instanceId, 'Task_ReceivePing');
          this.snapshotManager.markActive(instanceId, 'Gateway_Responded');
          this.snapshotManager.markError(instanceId, 'Gateway_Responded', result.error);
        }
      });

      // Atualiza o snapshot com o resultado final
      if (result.success) {
        this.snapshotManager.markCompleted(instanceId, 'Task_ReturnMS');
        this.snapshotManager.markActive(instanceId, 'EndEvent_Online');
        this.snapshotManager.markCompleted(instanceId, 'EndEvent_Online');
        this.snapshotManager.markProcessCompleted(instanceId);
      } else {
        this.snapshotManager.markActive(instanceId, 'EndEvent_Offline');
        this.snapshotManager.markError(instanceId, 'EndEvent_Offline', 'Servidor offline');
      }

      // Salva o resultado no MongoDB
      if (this.dbReady) {
        try {
          await this.repository.setResult(instanceId, {
            success: result.success,
            data: {
              host: result.host,
              time: result.time,
              packetLoss: result.packetLoss,
              output: result.output,
            },
            error: result.error,
          });
        } catch (err) {
          console.error('[EngineManager] Erro ao salvar resultado no MongoDB:', err);
        }
      }

      console.log(`[EngineManager] Processo de ping finalizado: ${instanceId}`);
      return { success: result.success, result };

    } catch (error) {
      console.error(`[EngineManager] Erro ao executar ping:`, error);
      this.snapshotManager.markError(instanceId, 'error', error instanceof Error ? error.message : 'Erro desconhecido');
      return { success: false, result: { success: false, host: '177.7.43.49', error: String(error) } };
    }
  }

  /**
   * Executa o processo de Envio de Email BPMN
   * Retorna true se o email foi enviado com sucesso
   */
  async executeEmailProcess(existingInstanceId?: string): Promise<{ success: boolean; result: EmailResult }> {
    const instanceId = existingInstanceId || `email-${++this.instanceCounter}`;

    // Se não é uma instância reutilizada, cria a instância e snapshot
    if (!existingInstanceId) {
      const instance: ProcessInstance = {
        instanceId,
        processName: 'Process_0yznkdz',
        bpmnFile: 'teste_de_email.bpmn',
        startedAt: new Date().toISOString()
      };
      this.instances.set(instanceId, instance);
    }

    // Atividades do processo de email
    const activities = [
      'StartEvent_1',
      'Activity_0lgejgo',
      'Activity_0wa4lu1',
      'Gateway_07hbhkv',
      'Activity_0zhzj2f',
      'Event_1ym6bvz',
      'Event_0rkw20j'
    ];

    // Recria o snapshot com as atividades reais do email
    this.snapshotManager.create(instanceId, 'Process_0yznkdz', activities);
    this.snapshotManager.markActive(instanceId, 'StartEvent_1');

    console.log(`[EngineManager] Iniciando processo de email: ${instanceId}`);

    try {
      // Executa o envio de email
      const result = await executeEmail({
        onPrepareEmail: () => {
          console.log(`[EngineManager] [PREP] Preparando email...`);
          this.snapshotManager.markCompleted(instanceId, 'StartEvent_1');
          this.snapshotManager.markActive(instanceId, 'Activity_0lgejgo');
        },
        onSendEmail: () => {
          console.log(`[EngineManager] [SEND] Enviando email...`);
          this.snapshotManager.markCompleted(instanceId, 'Activity_0lgejgo');
          this.snapshotManager.markActive(instanceId, 'Activity_0wa4lu1');
        },
        onEmailSuccess: (result) => {
          console.log(`[EngineManager] [OK] Email enviado com sucesso!`);
          this.snapshotManager.markCompleted(instanceId, 'Activity_0wa4lu1');
          this.snapshotManager.markActive(instanceId, 'Gateway_07hbhkv');
          this.snapshotManager.markActive(instanceId, 'Activity_0zhzj2f');
        },
        onEmailFailed: (result) => {
          console.log(`[EngineManager] [FAIL] Falha ao enviar email - ${result.error}`);
          this.snapshotManager.markCompleted(instanceId, 'Activity_0wa4lu1');
          this.snapshotManager.markActive(instanceId, 'Gateway_07hbhkv');
          this.snapshotManager.markError(instanceId, 'Gateway_07hbhkv', result.error);
        }
      });

      // Atualiza o snapshot com o resultado final
      if (result.success) {
        this.snapshotManager.markCompleted(instanceId, 'Activity_0zhzj2f');
        this.snapshotManager.markActive(instanceId, 'Event_1ym6bvz');
        this.snapshotManager.markCompleted(instanceId, 'Event_1ym6bvz');
        this.snapshotManager.markProcessCompleted(instanceId);
      } else {
        this.snapshotManager.markActive(instanceId, 'Event_0rkw20j');
        this.snapshotManager.markError(instanceId, 'Event_0rkw20j', result.error || 'Falha no envio');
      }

      // Salva o resultado no MongoDB
      if (this.dbReady) {
        try {
          await this.repository.setResult(instanceId, {
            success: result.success,
            data: {
              to: result.to,
              from: result.from,
              messageId: result.messageId,
            },
            error: result.error,
          });
        } catch (err) {
          console.error('[EngineManager] Erro ao salvar resultado no MongoDB:', err);
        }
      }

      console.log(`[EngineManager] Processo de email finalizado: ${instanceId}`);
      return { success: result.success, result };

    } catch (error) {
      console.error(`[EngineManager] Erro ao executar email:`, error);
      this.snapshotManager.markError(instanceId, 'error', error instanceof Error ? error.message : 'Erro desconhecido');
      return { success: false, result: { success: false, to: 'dev.paulo.murilo42@gmail.com', from: '', error: String(error) } };
    }
  }

  /**
   * Executa um processo BPMN genérico (para uso futuro)
   */
  async executeProcess(bpmnFile: string): Promise<string> {
    const instanceId = `${bpmnFile.replace('.bpmn', '')}-${++this.instanceCounter}`;
    const instance: ProcessInstance = {
      instanceId,
      processName: bpmnFile,
      bpmnFile,
      startedAt: new Date().toISOString()
    };

    this.instances.set(instanceId, instance);

    console.log(`[EngineManager] Executando processo: ${instanceId} (${bpmnFile})`);

    // Se for o ping.bpmn, executa o script de ping reutilizando a mesma instância
    if (bpmnFile === 'ping.bpmn') {
      await this.executePingProcess(instanceId);
      return instanceId;
    }

    // Se for o teste_de_email.bpmn, executa o script de email
    if (bpmnFile === 'teste_de_email.bpmn') {
      await this.executeEmailProcess(instanceId);
      return instanceId;
    }

    // Para processos genéricos, cria snapshot básico
    this.snapshotManager.create(instanceId, bpmnFile, ['start']);
    return instanceId;
  }

  /**
   * Remove todas as instâncias e snapshots
   */
  async clearAllInstances(): Promise<void> {
    this.instances.clear();
    this.activeLoops.clear();
    this.snapshotManager.removeAll();

    // Limpa também do MongoDB
    if (this.dbReady) {
      try {
        const count = await this.repository.deleteAll();
        console.log(`[EngineManager] ${count} instâncias removidas do MongoDB`);
      } catch (err) {
        console.error('[EngineManager] Erro ao limpar MongoDB:', err);
      }
    }

    console.log('[EngineManager] Todas as instâncias foram removidas');
  }

  /**
   * Verifica se o MongoDB está conectado
   */
  isDatabaseReady(): boolean {
    return this.dbReady;
  }
}
