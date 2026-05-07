// DadoJogoScript.ts
// Script para o processo Jogo do Dado - loop infinito

import { EventEmitter } from 'events';
import { Engine } from 'bpmn-engine';

const TASK_DELAY_MS = 2000;

export const DADO_JOGO_ACTIVITIES = [
  'Start_Jogador',
  'Task_JogadorPede',
  'Task_DadoRola',
  'Task_DadoEnvia',
  'Task_JogadorRecebe',
  'End_Jogador',
  'Start_Dado',
  'End_Dado',
];

export interface DadoJogoState {
  rodada: number;
  ultimoResultado: number;
}

export function createDadoJogoServices(round: number, state: DadoJogoState) {
  return {
    jogadorPede: function(_ctx: unknown, callback: (err: Error | null) => void) {
      console.log(`[Jogador] 🎲 Rodada ${round}: Pedindo dado...`);
      setTimeout(() => callback(null), TASK_DELAY_MS);
    },

    dadoRola: function(_ctx: unknown, callback: (err: Error | null) => void) {
      console.log('[Dado] 🎲 Rolando (2s)...');
      setTimeout(() => {
        state.ultimoResultado = Math.floor(Math.random() * 6) + 1;
        console.log(`[Dado] 🎲 Resultado: ${state.ultimoResultado}`);
        callback(null);
      }, TASK_DELAY_MS);
    },

    dadoEnvia: function(_ctx: unknown, callback: (err: Error | null) => void) {
      console.log(`[Dado] 📤 Enviando resultado: ${state.ultimoResultado}`);
      setTimeout(() => callback(null), TASK_DELAY_MS);
    },

    jogadorRecebe: function(_ctx: unknown, callback: (err: Error | null) => void) {
      console.log(`[Jogador] 📥 Recebi o número: ${state.ultimoResultado} (rodada ${round})`);
      setTimeout(() => callback(null), TASK_DELAY_MS);
    },
  };
}

export function createDadoJogoListener(
  instanceId: string,
  snap: any,
  services: Record<string, Function>
) {
  const listener = new EventEmitter();

  listener.on('activity.start', (activity: { id: string }) => {
    console.log(`[Engine] ▶ ${activity.id}`);
    snap.markActive(instanceId, activity.id);

    const hasService = services[activity.id] !== undefined;
    if (!hasService) {
      setTimeout(() => {
        snap.markCompleted(instanceId, activity.id);
      }, TASK_DELAY_MS);
    }
  });

  listener.on('activity.end', (activity: { id: string }) => {
    console.log(`[Engine] ✓ ${activity.id}`);
    const snapData = snap.get(instanceId);
    if (snapData && snapData.activities[activity.id] === 'active') {
      snap.markCompleted(instanceId, activity.id);
    }
  });

  listener.on('activity.error', (activity: { id: string }, err: Error) => {
    console.error(`[Engine] ✗ ${activity.id}`, err?.message);
    snap.markError(instanceId, activity.id, err?.message);
  });

  return listener;
}

export async function runDadoJogoOnce(
  instanceId: string,
  source: string,
  round: number,
  snap: any
): Promise<void> {
  const state: DadoJogoState = { rodada: round, ultimoResultado: 0 };
  const services = createDadoJogoServices(round, state);
  const listener = createDadoJogoListener(instanceId, snap, services);

  const engine = new Engine({
    name: `${instanceId}-r${round}`,
    source,
    services,
  });

  await engine.execute({ listener });
  console.log(`[Engine] ✅ Rodada ${round} concluída`);
}

export function resetDadoJogoActivities(snap: any, instanceId: string): void {
  const snapData = snap.get(instanceId);
  if (snapData) {
    for (const id of DADO_JOGO_ACTIVITIES) {
      snapData.activities[id] = 'pending';
    }
    snapData.status = 'running';
  }
}