// ProcessInstanceRepository.ts
// Operações CRUD para instâncias de processos no MongoDB

import { ProcessInstanceModel, type IProcessInstance, type ActivityStatus, type ProcessStatus, type ILogEntry, type IProcessResult } from '../models/ProcessInstance.js';

export class ProcessInstanceRepository {
  /**
   * Cria uma nova instância de processo no banco
   */
  async create(data: {
    instanceId: string;
    processName: string;
    bpmnFile: string;
    activities?: Record<string, ActivityStatus>;
  }): Promise<IProcessInstance> {
    const now = new Date();
    const activities = new Map<string, ActivityStatus>();

    if (data.activities) {
      for (const [key, value] of Object.entries(data.activities)) {
        activities.set(key, value);
      }
    }

    const instance = new ProcessInstanceModel({
      instanceId: data.instanceId,
      processName: data.processName,
      bpmnFile: data.bpmnFile,
      startedAt: now,
      updatedAt: now,
      status: 'running',
      activities,
      log: [],
    });

    await instance.save();
    console.log(`[DB Repository] Instância criada: ${data.instanceId}`);
    return instance;
  }

  /**
   * Busca uma instância por instanceId
   */
  async findById(instanceId: string): Promise<IProcessInstance | null> {
    return ProcessInstanceModel.findOne({ instanceId }).exec();
  }

  /**
   * Lista todas as instâncias
   */
  async findAll(): Promise<IProcessInstance[]> {
    return ProcessInstanceModel.find().sort({ updatedAt: -1 }).exec();
  }

  /**
   * Lista apenas instâncias ativas (running)
   */
  async findActive(): Promise<IProcessInstance[]> {
    return ProcessInstanceModel.find({ status: 'running' })
      .sort({ updatedAt: -1 })
      .exec();
  }

  /**
   * Atualiza o status de uma atividade específica
   */
  async updateActivity(
    instanceId: string,
    activityId: string,
    status: ActivityStatus
  ): Promise<IProcessInstance | null> {
    const now = new Date();
    return ProcessInstanceModel.findOneAndUpdate(
      { instanceId },
      {
        $set: {
          [`activities.${activityId}`]: status,
          updatedAt: now,
        },
        $push: {
          log: {
            time: now,
            activityId,
            event: status === 'active' ? 'start' : status === 'completed' ? 'end' : status,
          },
        },
      },
      { new: true }
    ).exec();
  }

  /**
   * Marca uma atividade como ativa
   */
  async markActive(instanceId: string, activityId: string): Promise<IProcessInstance | null> {
    return this.updateActivity(instanceId, activityId, 'active');
  }

  /**
   * Marca uma atividade como concluída
   */
  async markCompleted(instanceId: string, activityId: string): Promise<IProcessInstance | null> {
    return this.updateActivity(instanceId, activityId, 'completed');
  }

  /**
   * Marca uma atividade como erro
   */
  async markError(
    instanceId: string,
    activityId: string,
    detail?: string
  ): Promise<IProcessInstance | null> {
    const now = new Date();
    return ProcessInstanceModel.findOneAndUpdate(
      { instanceId },
      {
        $set: {
          [`activities.${activityId}`]: 'error',
          status: 'error',
          updatedAt: now,
        },
        $push: {
          log: {
            time: now,
            activityId,
            event: 'error',
            detail,
          },
        },
      },
      { new: true }
    ).exec();
  }

  /**
   * Marca o processo como concluído
   */
  async markProcessCompleted(instanceId: string): Promise<IProcessInstance | null> {
    return ProcessInstanceModel.findOneAndUpdate(
      { instanceId },
      {
        $set: {
          status: 'completed',
          updatedAt: new Date(),
        },
      },
      { new: true }
    ).exec();
  }

  /**
   * Adiciona uma entrada de log
   */
  async addLog(
    instanceId: string,
    entry: ILogEntry
  ): Promise<IProcessInstance | null> {
    return ProcessInstanceModel.findOneAndUpdate(
      { instanceId },
      {
        $push: { log: entry },
        $set: { updatedAt: new Date() },
      },
      { new: true }
    ).exec();
  }

  /**
   * Salva o resultado do processo
   */
  async setResult(
    instanceId: string,
    result: IProcessResult
  ): Promise<IProcessInstance | null> {
    return ProcessInstanceModel.findOneAndUpdate(
      { instanceId },
      {
        $set: {
          result,
          updatedAt: new Date(),
        },
      },
      { new: true }
    ).exec();
  }

  /**
   * Atualiza dados gerais de uma instância
   */
  async update(
    instanceId: string,
    data: Partial<{
      status: ProcessStatus;
      activities: Record<string, ActivityStatus>;
      result: IProcessResult;
    }>
  ): Promise<IProcessInstance | null> {
    const updateData: Record<string, unknown> = { updatedAt: new Date() };

    if (data.status) updateData.status = data.status;
    if (data.result) updateData.result = data.result;
    if (data.activities) {
      for (const [key, value] of Object.entries(data.activities)) {
        updateData[`activities.${key}`] = value;
      }
    }

    return ProcessInstanceModel.findOneAndUpdate(
      { instanceId },
      { $set: updateData },
      { new: true }
    ).exec();
  }

  /**
   * Remove uma instância por ID
   */
  async deleteById(instanceId: string): Promise<boolean> {
    const result = await ProcessInstanceModel.deleteOne({ instanceId }).exec();
    return result.deletedCount > 0;
  }

  /**
   * Remove todas as instâncias
   */
  async deleteAll(): Promise<number> {
    const result = await ProcessInstanceModel.deleteMany({}).exec();
    console.log(`[DB Repository] ${result.deletedCount} instâncias removidas`);
    return result.deletedCount;
  }
}
