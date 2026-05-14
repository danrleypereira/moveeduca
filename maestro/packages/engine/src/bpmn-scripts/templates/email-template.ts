/**
 * Template de Email do Maestro BPMN Engine
 * Personalize o HTML do email conforme necessário
 */

export interface EmailTemplateData {
    recipientName?: string;
    processName?: string;
    timestamp?: string;
}

export function getEmailTemplate(data: EmailTemplateData = {}): { text: string; html: string } {
    const {
        recipientName = 'Usuário',
        processName = 'Envio de Email',
        timestamp = new Date().toLocaleString('pt-BR'),
    } = data;

    const text = `
Maestro BPMN Engine - ${processName}

Olá ${recipientName}!

Este é um email enviado automaticamente pelo Maestro BPMN Engine.

Processo: ${processName}
Data/Hora: ${timestamp}

---
Maestro BPMN Engine
Vargem Grande do Sul - Santa Marta, VGDS - SP, 13880-000, Brazil
    `.trim();

    const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${processName} - Maestro BPMN</title>
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .body { padding: 30px; color: #333; }
        .body p { line-height: 1.6; margin-bottom: 15px; }
        .badge { display: inline-block; background: #22c55e; color: white; padding: 5px 15px; border-radius: 20px; font-size: 14px; }
        .info-box { background: #f0f9ff; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Maestro BPMN Engine</h1>
        </div>
        <div class="body">
            <p>Olá, <strong>${recipientName}</strong>!</p>
            <p>Este é um email enviado automaticamente pelo <em>Maestro BPMN Engine</em>.</p>
            
            <div class="info-box">
                <p><strong>[PROCESS] Processo:</strong> ${processName}</p>
                <p><strong>[TIME] Data/Hora:</strong> ${timestamp}</p>
            </div>
            
            <p>O processo foi executado com sucesso! [OK]</p>
            <p class="badge">Email Enviado</p>
        </div>
        <div class="footer">
            <p><strong>Maestro BPMN Engine</strong></p>
            <p>Vargem Grande do Sul - Santa Marta, VGDS - SP, 13880-000, Brazil</p>
            <p><small>Este email foi gerado automaticamente. Não responda esta mensagem.</small></p>
        </div>
    </div>
</body>
</html>
    `.trim();

    return { text, html };
}
