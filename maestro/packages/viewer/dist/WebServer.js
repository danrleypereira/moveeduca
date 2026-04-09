import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export class WebServer {
    app;
    port = 3000;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use('/bpmn', express.static(path.join(__dirname, 'bpmn-definitions')));
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.redirect('/viewer.html');
        });
        this.app.get('/api/diagrams', (req, res) => {
            const dir = path.join(__dirname, 'bpmn-definitions');
            if (!fs.existsSync(dir))
                fs.mkdirSync(dir, { recursive: true });
            const files = fs.readdirSync(dir).filter(f => f.endsWith('.bpmn'));
            res.json(files);
        });
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Servidor rodando em http://localhost:${this.port}`);
        });
    }
}
