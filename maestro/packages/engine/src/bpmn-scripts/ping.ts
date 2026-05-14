/**
 * BPMN Script: Ping Server
 * Executa um ping na VPS 177.7.43.49 e retorna o status
 * 
 * Fluxo do processo:
 * 1. Task_SendPing → Envia ping para o servidor
 * 2. Task_ReceivePing → Recebe a resposta
 * 3. Gateway_Responded → Verifica se houve resposta
 * 4a. Se Sim → Task_ReturnMS → EndEvent_Online
 * 4b. Se Não → EndEvent_Offline
 */

import { spawn } from 'child_process';
import { EventEmitter } from 'events';

export interface PingResult {
    success: boolean;
    host: string;
    time?: number;        // tempo de resposta em ms
    packetLoss?: number;   // percentual de pacotes perdidos
    output?: string;       // saída completa do ping
    error?: string;        // mensagem de erro se falhou
}

export interface PingCallbacks {
    onSendPing?: (host: string) => void;
    onReceivePing?: (result: PingResult) => void;
    onPingSuccess?: (result: PingResult) => void;
    onPingFailed?: (result: PingResult) => void;
    onComplete?: (success: boolean, result: PingResult) => void;
}

const VPS_HOST = '177.7.43.49';
const PING_COUNT = 1;          // Executa apenas 1 ping (não loop)
const PING_TIMEOUT = 5000;     // Timeout de 5 segundos

/**
 * Executa o ping no servidor VPS
 */
export async function executePing(callbacks: PingCallbacks = {}): Promise<PingResult> {
    const { onSendPing, onReceivePing, onPingSuccess, onPingFailed, onComplete } = callbacks;

    // Callback: Início do envio do ping
    onSendPing?.(VPS_HOST);

    return new Promise<PingResult>((resolve) => {
        const result: PingResult = {
            success: false,
            host: VPS_HOST
        };

        // Executa o comando ping
        // -c 1: apenas 1 pacote
        // -W 5: timeout de 5 segundos
        const pingProcess = spawn('ping', ['-c', String(PING_COUNT), '-W', '5', VPS_HOST]);

        let stdout = '';
        let stderr = '';
        let resolved = false;

        const timeout = setTimeout(() => {
            if (!resolved) {
                resolved = true;
                result.success = false;
                result.error = 'Timeout - servidor não respondeu';
                result.packetLoss = 100;
                finish();
            }
        }, PING_TIMEOUT);

        pingProcess.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        pingProcess.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        pingProcess.on('close', (code) => {
            if (resolved) return;
            clearTimeout(timeout);
            
            // Callback: Ping recebido
            onReceivePing?.(result);

            if (code === 0) {
                // Ping bem sucedido
                const timeMatch = stdout.match(/time[=<](\d+\.?\d*)\s*ms/i);
                result.success = true;
                result.time = timeMatch ? parseFloat(timeMatch[1]) : undefined;
                result.packetLoss = 0;
                result.output = stdout;
                
                // Callback: Ping bem sucedido
                onPingSuccess?.(result);
            } else {
                // Ping falhou
                result.success = false;
                result.error = stderr || 'Host inacessível ou não responde';
                result.packetLoss = 100;
                result.output = stdout;
                
                // Callback: Ping falhou
                onPingFailed?.(result);
            }

            finish();
        });

        pingProcess.on('error', (err) => {
            if (resolved) return;
            clearTimeout(timeout);
            
            result.success = false;
            result.error = err.message;
            result.packetLoss = 100;
            
            onReceivePing?.(result);
            onPingFailed?.(result);
            
            finish();
        });

        function finish() {
            resolved = true;
            onComplete?.(result.success, result);
            resolve(result);
        }
    });
}

/**
 * Executa o fluxo completo do BPMN de ping
 * Retorna true se o servidor respondeu, false caso contrário
 */
export async function executePingProcess(): Promise<boolean> {
    console.log('[PingScript] Iniciando processo de ping BPMN...');
    console.log(`[PingScript] Alvo: ${VPS_HOST}`);

    const result = await executePing({
        onSendPing: (host) => {
            console.log(`[PingScript] -> Enviando ping para ${host}...`);
        },
        onReceivePing: (result) => {
            console.log(`[PingScript] -> Resposta recebida do ping`);
        },
        onPingSuccess: (result) => {
            console.log(`[PingScript] -> [OK] Servidor ${VPS_HOST} está ONLINE`);
            console.log(`[PingScript]    Tempo de resposta: ${result.time}ms`);
            console.log(`[PingScript]    Pacotes perdidos: ${result.packetLoss}%`);
        },
        onPingFailed: (result) => {
            console.log(`[PingScript] -> [FAIL] Servidor ${VPS_HOST} está OFFLINE`);
            console.log(`[PingScript]    Erro: ${result.error}`);
            console.log(`[PingScript]    Pacotes perdidos: ${result.packetLoss}%`);
        }
    });

    console.log(`[PingScript] Processo de ping finalizado. Sucesso: ${result.success}`);
    return result.success;
}

/**
 * Classe de emitter para eventos do processo de ping
 * Útil para integração com o engine BPMN
 */
export class PingProcessEmitter extends EventEmitter {
    private pingResult: PingResult | null = null;

    async start(): Promise<boolean> {
        this.emit('processStart');

        try {
            const result = await executePing({
                onSendPing: (host) => {
                    this.emit('sendPing', host);
                },
                onReceivePing: (result) => {
                    this.emit('receivePing', result);
                },
                onPingSuccess: (result) => {
                    this.emit('pingSuccess', result);
                },
                onPingFailed: (result) => {
                    this.emit('pingFailed', result);
                },
                onComplete: (success, result) => {
                    this.pingResult = result;
                    this.emit('complete', success, result);
                }
            });

            return result.success;
        } catch (error) {
            this.emit('error', error);
            return false;
        }
    }

    getLastResult(): PingResult | null {
        return this.pingResult;
    }
}
