// ProcessInstance.ts
// Schema e Model mongoose para instâncias de processos BPMN

import mongoose, { Schema, Document } from 'mongoose';

// Tipos locais (espelham os tipos do SnapshotManager do engine)
export type ActivityStatus = 'pending' | 'active' | 'completed' | 'error';
export type ProcessStatus = 'running' | 'completed' | 'error';

export interface ILogEntry {
  time: Date;
  activityId: string;
  event: string;
  detail?: string;
}

export interface IProcessResult {
  success: boolean;
  data?: Record<string, unknown>;
  error?: string;
}

export interface IProcessInstance extends Document {
  instanceId: string;
  processName: string;
  bpmnFile: string;
  startedAt: Date;
  updatedAt: Date;
  status: ProcessStatus;
  activities: Map<string, ActivityStatus>;
  log: ILogEntry[];
  result?: IProcessResult;
}

// Schema do mongoose
const LogEntrySchema = new Schema<ILogEntry>(
  {
    time: { type: Date, required: true },
    activityId: { type: String, required: true },
    event: { type: String, required: true },
    detail: { type: String },
  },
  { _id: false }
);

const ProcessResultSchema = new Schema<IProcessResult>(
  {
    success: { type: Boolean, required: true },
    data: { type: Schema.Types.Mixed },
    error: { type: String },
  },
  { _id: false }
);

const ProcessInstanceSchema = new Schema<IProcessInstance>(
  {
    instanceId: { type: String, required: true, unique: true, index: true },
    processName: { type: String, required: true },
    bpmnFile: { type: String, required: true },
    startedAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
    status: {
      type: String,
      enum: ['running', 'completed', 'error'],
      default: 'running',
      index: true,
    },
    activities: {
      type: Map,
      of: {
        type: String,
        enum: ['pending', 'active', 'completed', 'error'],
      },
      default: {},
    },
    log: { type: [LogEntrySchema], default: [] },
    result: { type: ProcessResultSchema },
  },
  {
    timestamps: false, // gerenciamos manualmente startedAt/updatedAt
    collection: 'process_instances',
  }
);

// Índices para consultas frequentes
ProcessInstanceSchema.index({ status: 1, updatedAt: -1 });

export const ProcessInstanceModel = mongoose.model<IProcessInstance>(
  'ProcessInstance',
  ProcessInstanceSchema
);
