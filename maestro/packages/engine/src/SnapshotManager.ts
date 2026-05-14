// SnapshotManager.ts
// Mantém o estado atual de cada atividade de uma instância de processo em memória
// Também notifica o banco de dados sobre mudanças via callback onUpdate

export type ActivityStatus = 'pending' | 'active' | 'completed' | 'error';

export interface ProcessSnapshot {
  instanceId: string;
  processName: string;
  startedAt: string;
  updatedAt: string;
  status: 'running' | 'completed' | 'error';
  activities: Record<string, ActivityStatus>;
  log: Array<{ time: string; activityId: string; event: string; detail?: string }>;
}

export type SnapshotUpdateCallback = (
  instanceId: string,
  event: 'created' | 'active' | 'completed' | 'error' | 'processCompleted',
  activityId?: string,
  detail?: string
) => void;

export class SnapshotManager {
  private snapshots: Map<string, ProcessSnapshot> = new Map();
  private onUpdate: SnapshotUpdateCallback | null = null;

  /**
   * Registra um callback que é chamado sempre que o snapshot é atualizado
   * Usado para sincronizar com o MongoDB
   */
  setUpdateCallback(callback: SnapshotUpdateCallback): void {
    this.onUpdate = callback;
  }

  /**
   * Cria um novo snapshot para uma instância de processo
   */
  create(instanceId: string, processName: string, activityIds: string[]): ProcessSnapshot {
    const now = new Date().toISOString();
    const activities: Record<string, ActivityStatus> = {};
    for (const id of activityIds) {
      activities[id] = 'pending';
    }

    const snapshot: ProcessSnapshot = {
      instanceId,
      processName,
      startedAt: now,
      updatedAt: now,
      status: 'running',
      activities,
      log: [],
    };

    this.snapshots.set(instanceId, snapshot);
    this.onUpdate?.(instanceId, 'created');
    return snapshot;
  }

  /**
   * Marca uma atividade como ativa (activity.start)
   */
  markActive(instanceId: string, activityId: string): void {
    const snap = this.snapshots.get(instanceId);
    if (!snap) return;

    snap.activities[activityId] = 'active';
    snap.updatedAt = new Date().toISOString();
    snap.log.push({
      time: snap.updatedAt,
      activityId,
      event: 'start',
    });
    this.onUpdate?.(instanceId, 'active', activityId);
  }

  /**
   * Marca uma atividade como concluída (activity.end)
   */
  markCompleted(instanceId: string, activityId: string): void {
    const snap = this.snapshots.get(instanceId);
    if (!snap) return;

    snap.activities[activityId] = 'completed';
    snap.updatedAt = new Date().toISOString();
    snap.log.push({
      time: snap.updatedAt,
      activityId,
      event: 'end',
    });
    this.onUpdate?.(instanceId, 'completed', activityId);
  }

  /**
   * Marca uma atividade como erro
   */
  markError(instanceId: string, activityId: string, detail?: string): void {
    const snap = this.snapshots.get(instanceId);
    if (!snap) return;

    snap.activities[activityId] = 'error';
    snap.status = 'error';
    snap.updatedAt = new Date().toISOString();
    snap.log.push({
      time: snap.updatedAt,
      activityId,
      event: 'error',
      detail,
    });
    this.onUpdate?.(instanceId, 'error', activityId, detail);
  }

  /**
   * Marca o processo como concluído
   */
  markProcessCompleted(instanceId: string): void {
    const snap = this.snapshots.get(instanceId);
    if (!snap) return;

    snap.status = 'completed';
    snap.updatedAt = new Date().toISOString();
    this.onUpdate?.(instanceId, 'processCompleted');
  }

  /**
   * Retorna o snapshot de uma instância
   */
  get(instanceId: string): ProcessSnapshot | undefined {
    return this.snapshots.get(instanceId);
  }

  /**
   * Retorna todos os snapshots
   */
  getAll(): ProcessSnapshot[] {
    return Array.from(this.snapshots.values());
  }

  /**
   * Remove um snapshot
   */
  remove(instanceId: string): void {
    this.snapshots.delete(instanceId);
  }

  /**
   * Remove todos os snapshots
   */
  removeAll(): void {
    this.snapshots.clear();
  }
}
