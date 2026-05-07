// EngineServer.ts
// Servidor Express do Engine na porta 42042

import express from 'express';
import cors from 'cors';
import { EngineManager } from './EngineManager.js';
import { SnapshotManager } from './SnapshotManager.js';
import { connectDatabase, isDatabaseConnected } from '@maestro/database';

const PORT = 42042;

export class EngineServer {
  private app: express.Application;
  private snapshotManager: SnapshotManager;
  private engineManager!: EngineManager; // será inicializado em init()

  constructor() {
    this.app = express();
    this.snapshotManager = new SnapshotManager();
    this.config();
    this.routes();
  }

  /**
   * Inicializa o servidor (conecta ao MongoDB e cria EngineManager)
   */
  async init(): Promise<void> {
    // Conecta ao MongoDB (obrigatório)
    await connectDatabase();
    if (!isDatabaseConnected()) {
      throw new Error('Falha ao conectar ao MongoDB');
    }
    
    // Cria o EngineManager após garantir conexão
    this.engineManager = new EngineManager(this.snapshotManager);
    console.log('[EngineServer] [OK] EngineManager inicializado com MongoDB');
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes(): void {
    // Health check (inclui status do MongoDB)
    this.app.get('/health', (_req, res) => {
      res.json({
        status: 'ok',
        port: PORT,
        mongodb: isDatabaseConnected() ? 'connected' : 'disconnected',
      });
    });

    // Lista definições BPMN disponíveis
    this.app.get('/api/definitions', (_req, res) => {
      const files = this.engineManager.listDefinitions();
      res.json(files);
    });

    // Retorna o XML BPMN de uma definição
    this.app.get('/api/definitions/:fileName', (req, res) => {
      const xml = this.engineManager.readDefinition(req.params.fileName);
      if (!xml) {
        res.status(404).json({ error: 'Definição não encontrada' });
        return;
      }
      res.type('application/xml').send(xml);
    });

    // Lista todas as instâncias (do MongoDB)
    this.app.get('/api/process', async (_req, res) => {
      try {
        const dbInstances = await this.engineManager.getInstances();
        const result = dbInstances.map(inst => ({
          instanceId: inst.instanceId,
          processName: inst.processName,
          bpmnFile: inst.bpmnFile,
          startedAt: inst.startedAt,
          status: 'running',
        }));
        res.json(result);
      } catch (error) {
        console.error('[EngineServer] Erro ao listar processos:', error);
        res.status(500).json({ error: 'Erro ao listar processos' });
      }
    });

    // Retorna o status (snapshot) de uma instância (do MongoDB)
    this.app.get('/api/process/:instanceId/status', async (req, res) => {
      try {
        const snap = await this.engineManager.getInstanceStatus(req.params.instanceId);
        if (!snap) {
          res.status(404).json({ error: 'Instância não encontrada' });
          return;
        }
        res.json(snap);
      } catch (error) {
        console.error('[EngineServer] Erro ao buscar status:', error);
        res.status(500).json({ error: 'Erro ao buscar status da instância' });
      }
    });

    // Retorna o XML BPMN da instância (para o viewer renderizar)
    this.app.get('/api/process/:instanceId/diagram', (req, res) => {
      const instance = this.engineManager.getInstance(req.params.instanceId);
      if (!instance) {
        res.status(404).json({ error: 'Instância não encontrada' });
        return;
      }
      const xml = this.engineManager.readDefinition(instance.bpmnFile);
      if (!xml) {
        res.status(404).json({ error: 'Arquivo BPMN não encontrado' });
        return;
      }
      res.type('application/xml').send(xml);
    });

    // Executa o processo de Ping BPMN (1 única vez, não loop)
    this.app.post('/api/process/ping/execute', async (_req, res) => {
      try {
        console.log('[EngineServer] Recebido comando para executar ping');
        const { success, result } = await this.engineManager.executePingProcess();
        
        res.json({
          success,
          result: {
            host: result.host,
            time: result.time,
            packetLoss: result.packetLoss,
            error: result.error,
            message: success
              ? `Servidor ${result.host} está ONLINE! Tempo: ${result.time}ms`
              : `Servidor ${result.host} está OFFLINE: ${result.error}`
          }
        });
      } catch (error) {
        console.error('[EngineServer] Erro ao executar ping:', error);
        res.status(500).json({
          success: false,
          error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
      }
    });

    // Executa o processo de Envio de Email BPMN (1 única vez, não loop)
    this.app.post('/api/process/email/execute', async (_req, res) => {
      try {
        console.log('[EngineServer] Recebido comando para executar email');
        const { success, result } = await this.engineManager.executeEmailProcess();
        
        res.json({
          success,
          result: {
            to: result.to,
            from: result.from,
            messageId: result.messageId,
            error: result.error,
            message: success
              ? `Email enviado com sucesso para ${result.to}!`
              : `Falha ao enviar email: ${result.error}`
          }
        });
      } catch (error) {
        console.error('[EngineServer] Erro ao executar email:', error);
        res.status(500).json({
          success: false,
          error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
      }
    });

    // Executa um processo BPMN específico
    this.app.post('/api/process/:bpmnFile/execute', async (req, res) => {
      try {
        const { bpmnFile } = req.params;
        const instanceId = await this.engineManager.executeProcess(bpmnFile);
        res.json({ success: true, instanceId });
      } catch (error) {
        console.error('[EngineServer] Erro ao executar processo:', error);
        res.status(500).json({
          success: false,
          error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
      }
    });

    // Inicia um processo BPMN (endpoint esperado pelo viewer)
    this.app.post('/api/process/start', async (req, res) => {
      try {
        console.log('[EngineServer] POST /api/process/start');
        const { bpmnFile } = req.body;
        if (!bpmnFile) {
          res.status(400).json({ error: 'bpmnFile é obrigatório', body: req.body });
          return;
        }
        
        console.log(`[EngineServer] Iniciando processo: ${bpmnFile}`);
        const instanceId = await this.engineManager.executeProcess(bpmnFile);
        
        res.json({
          instanceId,
          processName: bpmnFile,
          status: 'started'
        });
      } catch (error) {
        console.error('[EngineServer] Erro ao iniciar processo:', error);
        res.status(500).json({
          error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
      }
    });

    // Limpa todas as instâncias ativas
    this.app.delete('/api/process', async (_req, res) => {
      try {
        await this.engineManager.clearAllInstances();
        res.json({ success: true, message: 'Todas as instâncias foram removidas' });
      } catch (error) {
        console.error('[EngineServer] Erro ao limpar instâncias:', error);
        res.status(500).json({
          success: false,
          error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
      }
    });
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`[Engine] [OK] rodando em http://localhost:${PORT}`);
    });
  }
}
