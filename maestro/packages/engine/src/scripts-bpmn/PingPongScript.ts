// PingPongScript.ts
// Script para o processo Ping-Pong - 10 rounds

import { EventEmitter } from 'events';
import { Engine } from 'bpmn-engine';

const TASK_DELAY_MS = 2000;

export const PING_PONG_ACTIVITIES = [
  'Start_P1',
  'Task_P1Rebate',
  'Task_P1Recebe',
  'Gateway_P1',
  'End_P1',
  'Start_P2',
  'Task_P2Recebe',
  'Task_P2Rebate',
  'End_P2',
];

export const MAX_ROUNDS = 10;

export interface PingPongState {
  round: number;
  maxRounds: number;
}

export function createPingPongServices(round: number) {
  return {
    p1Rebate: function(_ctx: unknown, callback: (err: Error | null) => void) {
      console.log(`[P1] 🏓 Ping! (round ${round})`);
      setTimeout(() => callback(null), TASK_DELAY_MS);
    },
    p1Recebe: function(_ctx: unknown, callback: (err: Error | null) => void) {
      console.log(`[P1] 🏓 Recebi Pong! (round ${round})`);
      setTimeout(() => callback(null), TASK_DELAY_MS);
    },
  };
}

export function createPingPongListener(
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

export async function runPingPongOnce(
  instanceId: string,
  source: string,
  round: number,
  snap: any
): Promise<void> {
  const services = createPingPongServices(round);
  const listener = createPingPongListener(instanceId, snap, services);

  const engine = new Engine({
    name: `${instanceId}-r${round}`,
    source,
    services,
    state: {
      variables: {
        rounds: round
      }
    }
  });

  await engine.execute({ listener });
  console.log(`[Engine] 🎾 Round ${round} concluído`);
}

export function resetPingPongActivities(snap: any, instanceId: string): void {
  const snapData = snap.get(instanceId);
  if (snapData) {
    for (const id of PING_PONG_ACTIVITIES) {
      snapData.activities[id] = 'pending';
    }
    snapData.status = 'running';
  }
}

export function shouldContinuePingPong(state: PingPongState): boolean {
  return state.round < state.maxRounds;
}