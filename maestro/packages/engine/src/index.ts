// Engine - Entry Point
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Carrega variáveis de ambiente do .env do engine
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

import { EngineServer } from './EngineServer.js';

const server = new EngineServer();

// Inicializa (conecta ao MongoDB) e depois inicia o servidor
server.init().then(() => {
  server.start();
}).catch((error) => {
  console.error('[Engine] Falha crítica na inicialização:', error);
  process.exit(1);
});
