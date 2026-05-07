// scripts-bpmn/index.ts
// Interface base para scripts BPMN

import { EventEmitter } from 'events';

export interface BpmnScript {
  // Nome do processo BPMN
  processName: string;
  
  // Nome do arquivo BPMN
  bpmnFile: string;
  
  // IDs das atividades monitoradas
  activityIds: string[];
  
  // Serviços (service tasks) do BPMN
  services: Record<string, Function>;
  
  // Estados que o processo pode ter (ex: rodadas)
  getState?: () => Record<string, unknown>;
  
  // Validar se o processo deve continuar
  shouldContinue?: (state: Record<string, unknown>) => boolean;
  
  // Hook chamado antes de cada execução
  onBeforeExecute?: (round: number, state: Record<string, unknown>) => void;
  
  // Hook chamado depois de cada execução
  onAfterExecute?: (round: number, state: Record<string, unknown>) => void;
}

export interface ScriptContext {
  instanceId: string;
  round: number;
  snap: any; // SnapshotManager
  listener: EventEmitter;
  source: string;
}

export * from './DadoJogoScript.js';
export * from './PingPongScript.js';