// @maestro/database
// Pacote de acesso ao MongoDB para o ecossistema Maestro

export { connectDatabase, disconnectDatabase, isDatabaseConnected } from './connection.js';
export { ProcessInstanceModel } from './models/ProcessInstance.js';
export type { IProcessInstance, ActivityStatus, ProcessStatus, ILogEntry, IProcessResult } from './models/ProcessInstance.js';
export { ProcessInstanceRepository } from './repositories/ProcessInstanceRepository.js';
