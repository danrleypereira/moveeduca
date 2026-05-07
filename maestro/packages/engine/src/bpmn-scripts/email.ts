/**
 * BPMN Script: Teste de Envio de Email
 * Envia um email de teste usando SendGrid API
 *
 * Fluxo do processo:
 * 1. Activity_0lgejgo (Preparação do e-mail)
 * 2. Activity_0wa4lu1 (Envio de e-mail)
 * 3. Gateway_07hbhkv (Verifica se enviou)
 * 4a. Se Sim → Activity_0zhzj2f (Email recebido) → Event_1ym6bvz (Fim)
 * 4b. Se Não → Event_0rkw20j (Erro ao enviar email)
 *
 * Variáveis de ambiente necessárias:
 * - SENDGRID_API_KEY: sua API key do SendGrid
 * - SENDGRID_FROM_EMAIL: email do remetente (verificado no SendGrid)
 * - SENDGRID_FROM_NAME: nome do remetente
 */

import sgMail from '@sendgrid/mail';
import { EventEmitter } from 'events';
import { getEmailTemplate } from './templates/email-template.js';

// Email de destino para teste
const TEST_EMAIL_TO = 'dev.paulo.murilo42@gmail.com';

export interface EmailResult {
    success: boolean;
    to: string;
    from: string;
    messageId?: string;
    error?: string;
}

export interface EmailCallbacks {
    onPrepareEmail?: () => void;
    onSendEmail?: () => void;
    onEmailSuccess?: (result: EmailResult) => void;
    onEmailFailed?: (result: EmailResult) => void;
    onComplete?: (success: boolean, result: EmailResult) => void;
}

interface SendGridConfig {
    apiKey: string;
    fromEmail: string;
    fromName: string;
}

/**
 * Obtém a configuração do SendGrid das variáveis de ambiente
 */
function getSendGridConfig(): SendGridConfig {
    const apiKey = process.env.SENDGRID_API_KEY;
    const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'noreply@maestro.local';
    const fromName = process.env.SENDGRID_FROM_NAME || 'Maestro BPMN';

    if (!apiKey) {
        throw new Error('SENDGRID_API_KEY não está definida nas variáveis de ambiente');
    }

    return { apiKey, fromEmail, fromName };
}

/**
 * Envia o email de teste via SendGrid
 */
export async function executeEmail(callbacks: EmailCallbacks = {}): Promise<EmailResult> {
    const { onPrepareEmail, onSendEmail, onEmailSuccess, onEmailFailed, onComplete } = callbacks;

    const result: EmailResult = {
        success: false,
        to: TEST_EMAIL_TO,
        from: '',
    };

    try {
        // Preparação do email
        onPrepareEmail?.();
        const config = getSendGridConfig();
        result.from = config.fromEmail;

        console.log('[EmailScript]    Preparando email...');
        console.log(`[EmailScript]    De: ${config.fromName} <${config.fromEmail}>`);
        console.log(`[EmailScript]    Para: ${TEST_EMAIL_TO}`);
        console.log(`[EmailScript]    Assunto: Teste de Envio de Email - Maestro BPMN Engine`);

        // Configura o SendGrid
        sgMail.setApiKey(config.apiKey);

        // Monta o email usando o template
        const { text, html } = getEmailTemplate({
            recipientName: 'Usuário',
            processName: 'Teste de Envio de Email',
            timestamp: new Date().toLocaleString('pt-BR'),
        });

        const msg = {
            to: TEST_EMAIL_TO,
            from: {
                email: config.fromEmail,
                name: config.fromName,
            },
            replyTo: {
                email: config.fromEmail,
                name: config.fromName,
            },
            subject: 'Teste de Envio de Email - Maestro BPMN Engine',
            text,
            html,
        };

        // Envio do email
        onSendEmail?.();
        console.log('[EmailScript] Enviando email via SendGrid...');

        const response = await sgMail.send(msg);

        result.success = true;
        result.messageId = Array.isArray(response) ? response[0]?.headers?.['x-message-id'] : undefined;

        console.log('[EmailScript] [OK] Email enviado com sucesso!');
        console.log(`[EmailScript]    Message-ID: ${result.messageId || 'N/A'}`);

        onEmailSuccess?.(result);

    } catch (error: unknown) {
        result.success = false;
        const errorMessage = error instanceof Error ? error.message : String(error);
        result.error = errorMessage;

        console.error('[EmailScript] [FAIL] Falha ao enviar email:', errorMessage);
        
        // Log detalhado do erro do SendGrid
        if (error && typeof error === 'object' && 'response' in error) {
            const sendGridError = error as { response?: { body?: { errors?: Array<{ message: string }> } } };
            if (sendGridError.response?.body?.errors) {
                console.error('[EmailScript]    SendGrid errors:', sendGridError.response.body.errors);
            }
        }

        onEmailFailed?.(result);
    }

    onComplete?.(result.success, result);
    return result;
}

/**
 * Executa o fluxo completo do BPMN de email
 * Retorna true se o email foi enviado com sucesso
 */
export async function executeEmailProcess(): Promise<boolean> {
    console.log('[EmailScript] ====================================');
    console.log('[EmailScript] Iniciando processo de envio de email...');
    console.log(`[EmailScript] Destinatário: ${TEST_EMAIL_TO}`);
    console.log('[EmailScript] ====================================');

    const result = await executeEmail({
        onPrepareEmail: () => {
            console.log('[EmailScript] [1/4] [PREP] Preparando email...');
        },
        onSendEmail: () => {
            console.log('[EmailScript] [2/4] [SEND] Enviando email via SendGrid...');
        },
        onEmailSuccess: (result) => {
            console.log('[EmailScript] [3/4] [OK] Email enviado com sucesso!');
            console.log(`[EmailScript]    Message-ID: ${result.messageId || 'N/A'}`);
        },
        onEmailFailed: (result) => {
            console.log('[EmailScript] [3/4] [FAIL] Falha no envio!');
            console.log('[EmailScript]    Erro:', result.error);
        },
        onComplete: (success) => {
            console.log('[EmailScript] [4/4] [END] Processo finalizado. Sucesso:', success);
        }
    });

    return result.success;
}

/**
 * Classe de emitter para eventos do processo de email
 * Útil para integração com o engine BPMN
 */
export class EmailProcessEmitter extends EventEmitter {
    private emailResult: EmailResult | null = null;

    async start(): Promise<boolean> {
        this.emit('processStart');

        try {
            const result = await executeEmail({
                onPrepareEmail: () => {
                    this.emit('prepareEmail');
                },
                onSendEmail: () => {
                    this.emit('sendEmail');
                },
                onEmailSuccess: (result) => {
                    this.emailResult = result;
                    this.emit('emailSuccess', result);
                },
                onEmailFailed: (result) => {
                    this.emailResult = result;
                    this.emit('emailFailed', result);
                },
                onComplete: (success, result) => {
                    this.emailResult = result;
                    this.emit('complete', success, result);
                }
            });

            return result.success;
        } catch (error) {
            this.emit('error', error);
            return false;
        }
    }

    getLastResult(): EmailResult | null {
        return this.emailResult;
    }
}
