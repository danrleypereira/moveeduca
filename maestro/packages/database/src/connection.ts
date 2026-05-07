// connection.ts
// Conexão com MongoDB usando mongoose

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega o .env do diretório do pacote database
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'maestro';

let isConnected = false;

/**
 * Conecta ao MongoDB
 * Seguro para ser chamado múltiplas vezes (idempotente)
 */
export async function connectDatabase(): Promise<typeof mongoose> {
  if (isConnected) {
    console.log('[Database] Já conectado ao MongoDB');
    return mongoose;
  }

  try {
    console.log(`[Database] Conectando ao MongoDB: ${MONGODB_URI}/${MONGODB_DB_NAME}`);
    
    const conn = await mongoose.connect(`${MONGODB_URI}/${MONGODB_DB_NAME}`, {
      // Opções padrão do mongoose 8.x
    });

    isConnected = true;
    console.log(`[Database] [OK] Conectado ao MongoDB: ${conn.connection.host}:${conn.connection.port}/${MONGODB_DB_NAME}`);

    // Listeners de conexão
    mongoose.connection.on('error', (err) => {
      console.error('[Database] [ERROR] Erro na conexão MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('[Database] [WARN] Desconectado do MongoDB');
      isConnected = false;
    });

    mongoose.connection.on('reconnected', () => {
      console.log('[Database] [OK] Reconectado ao MongoDB');
      isConnected = true;
    });

    return conn;
  } catch (error) {
    console.error('[Database] [ERROR] Falha ao conectar ao MongoDB:', error);
    isConnected = false;
    throw error;
  }
}

/**
 * Desconecta do MongoDB
 */
export async function disconnectDatabase(): Promise<void> {
  if (!isConnected) return;
  
  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('[Database] Desconectado do MongoDB');
  } catch (error) {
    console.error('[Database] Erro ao desconectar do MongoDB:', error);
    throw error;
  }
}

/**
 * Verifica se está conectado
 */
export function isDatabaseConnected(): boolean {
  return isConnected && mongoose.connection.readyState === 1;
}
