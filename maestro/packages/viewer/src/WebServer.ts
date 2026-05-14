import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';
import http from 'http';
import { connectDatabase, ProcessInstanceRepository, isDatabaseConnected } from '@maestro/database';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENGINE_HOST = 'localhost';
const ENGINE_PORT = 42042;

export class WebServer {
    private app: express.Application;
    private port: number = 3000;
    private repository: ProcessInstanceRepository;

    constructor() {
        this.app = express();
        this.repository = new ProcessInstanceRepository();
        this.config();
        this.routes();
        this.initDatabase();
    }

    private async initDatabase(): Promise<void> {
        try {
            await connectDatabase();
            console.log('[Viewer] [OK] Conectado ao MongoDB');
        } catch (error) {
            console.error('[Viewer] [WARN] Falha ao conectar MongoDB. Usando proxy para engine.', error);
        }
    }

    private config() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use('/bpmn', express.static(path.join(__dirname, 'bpmn-definitions')));
    }

    private routes() {
        this.app.get('/', (_req, res) => {
            res.redirect('/viewer.html');
        });

        // Lista diagramas BPMN estáticos do viewer
        this.app.get('/api/diagrams', (_req, res) => {
            const dir = path.join(__dirname, 'bpmn-definitions');
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            
            const files = fs.readdirSync(dir).filter((f: string) => f.endsWith('.bpmn'));
            res.json(files);
        });

        // Health check — inclui status do MongoDB
        this.app.get('/api/engine/health', (_req, res) => {
            const options: http.RequestOptions = {
                hostname: ENGINE_HOST,
                port: ENGINE_PORT,
                path: '/health',
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };

            const proxyReq = http.request(options, (proxyRes) => {
                res.status(proxyRes.statusCode ?? 500);
                res.setHeader('Content-Type', proxyRes.headers['content-type'] ?? 'application/json');
                proxyRes.pipe(res);
            });

            proxyReq.on('error', (err) => {
                console.error('[Viewer] Health check error:', err.message);
                res.status(503).json({ status: 'error', error: 'Engine indisponível' });
            });

            proxyReq.end();
        });

        // Database health check
        this.app.get('/api/database/health', (_req, res) => {
            const connected = isDatabaseConnected();
            res.json({
                status: connected ? 'ok' : 'disconnected',
                database: connected ? 'MongoDB conectado' : 'MongoDB desconectado',
                timestamp: new Date().toISOString()
            });
        });

        // ============================================================
        // Rotas que leem do MongoDB diretamente (sem proxy para engine)
        // ============================================================

        // Lista todas as instâncias do MongoDB
        this.app.get('/api/instances', async (req, res) => {
            try {
                if (!isDatabaseConnected()) {
                    // Fallback: proxy para engine
                    return this._proxyToEngine(req, res, '/api/process');
                }

                const instances = await this.repository.findAll();
                const result = instances.map(doc => ({
                    instanceId: doc.instanceId,
                    processName: doc.processName,
                    bpmnFile: doc.bpmnFile,
                    startedAt: doc.startedAt.toISOString(),
                    updatedAt: doc.updatedAt.toISOString(),
                    status: doc.status,
                }));
                res.json(result);
            } catch (error) {
                console.error('[Viewer] Erro ao listar instâncias do MongoDB:', error);
                // Fallback: proxy para engine
                this._proxyToEngine(req, res, '/api/process');
            }
        });

        // Status de uma instância específica do MongoDB
        this.app.get('/api/instances/:instanceId/status', async (req, res) => {
            try {
                if (!isDatabaseConnected()) {
                    return this._proxyToEngine(req, res, `/api/process/${req.params.instanceId}/status`);
                }

                const doc = await this.repository.findById(req.params.instanceId);
                if (!doc) {
                    res.status(404).json({ error: 'Instância não encontrada' });
                    return;
                }
                res.json({
                    instanceId: doc.instanceId,
                    processName: doc.processName,
                    startedAt: doc.startedAt.toISOString(),
                    updatedAt: doc.updatedAt.toISOString(),
                    status: doc.status,
                    activities: Object.fromEntries(doc.activities),
                    log: doc.log,
                    result: doc.result,
                });
            } catch (error) {
                console.error('[Viewer] Erro ao buscar instância do MongoDB:', error);
                this._proxyToEngine(req, res, `/api/process/${req.params.instanceId}/status`);
            }
        });

        // ============================================================
        // Proxy para o Engine — repassa chamadas /api/engine/* para porta 42042
        // (usado para iniciar processos, buscar definições, etc.)
        // ============================================================
        this.app.use('/api/engine', (req, res) => {
            const targetPath = '/api' + req.url;
            console.log(`[Viewer] Proxy: ${req.method} ${req.url} -> ${targetPath}`);
            
            const options: http.RequestOptions = {
                hostname: ENGINE_HOST,
                port: ENGINE_PORT,
                path: targetPath,
                method: req.method,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const proxyReq = http.request(options, (proxyRes) => {
                res.status(proxyRes.statusCode ?? 500);
                
                const contentType = proxyRes.headers['content-type'] ?? 'application/json';
                res.setHeader('Content-Type', contentType);

                proxyRes.pipe(res);
            });

            proxyReq.on('error', (err) => {
                console.error('[Viewer] [ERROR] Proxy error:', err.message);
                res.status(503).json({
                    error: 'Engine indisponível',
                    detail: 'Certifique-se que o engine está rodando na porta 42042'
                });
            });

            if (req.method !== 'GET' && req.method !== 'HEAD') {
                const bodyData = JSON.stringify(req.body);
                proxyReq.write(bodyData);
                proxyReq.end();
            } else {
                proxyReq.end();
            }
        });
    }

    /**
     * Helper para fazer proxy de uma requisição GET para o engine
     */
    private _proxyToEngine(
        req: express.Request,
        res: express.Response,
        targetPath: string
    ): void {
        const options: http.RequestOptions = {
            hostname: ENGINE_HOST,
            port: ENGINE_PORT,
            path: targetPath,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        const proxyReq = http.request(options, (proxyRes) => {
            res.status(proxyRes.statusCode ?? 500);
            res.setHeader('Content-Type', proxyRes.headers['content-type'] ?? 'application/json');
            proxyRes.pipe(res);
        });

        proxyReq.on('error', (err) => {
            console.error('[Viewer] [ERROR] Proxy fallback error:', err.message);
            res.status(503).json({
                error: 'Engine e MongoDB indisponíveis',
                detail: 'Certifique-se que o engine e MongoDB estão rodando'
            });
        });

        proxyReq.end();
    }

    public start() {
        this.app.listen(this.port, () => {
            console.log(`[Viewer] [OK] rodando em http://localhost:${this.port}`);
        });
    }
}
