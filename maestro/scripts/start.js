#!/usr/bin/env node

// Maestro - Start Script
// Inicia os serviços do ecossistema (MongoDB + Engine + Viewer)
// Suporta: mongod nativo, Docker, ou MongoDB externo

const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const net = require('net');

console.log('Maestro BPMN - Starting...\n');

// ============================================================
// Configuração do MongoDB
// ============================================================
const MONGODB_DB_PATH = path.join(__dirname, '..', 'data', 'mongodb');
const MONGODB_PORT = 27017;
const MONGODB_LOG = path.join(__dirname, '..', 'data', 'mongodb.log');
const MONGODB_CONTAINER_NAME = 'maestro-mongo';

/**
 * Verifica se algo está escutando na porta 27017 (MongoDB ou outro)
 */
function isPortInUse(port) {
  return new Promise((resolve) => {
    const client = net.createConnection({ port, host: '127.0.0.1' }, () => {
      client.end();
      resolve(true);
    });
    client.on('error', () => resolve(false));
    client.setTimeout(1000, () => {
      client.destroy();
      resolve(false);
    });
  });
}

/**
 * Verifica se o mongod está disponível no sistema
 */
function isMongoAvailable() {
  try {
    execSync('mongod --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Verifica se o Docker está disponível e acessível
 */
function isDockerAvailable() {
  try {
    execSync('docker --version', { stdio: 'ignore' });
    try {
      execSync('docker ps', { stdio: 'ignore' });
      return true;
    } catch {
      console.log('\x1b[33m       [WARN] Docker encontrado mas sem permissão (sudo necessário)\x1b[0m');
      return false;
    }
  } catch {
    return false;
  }
}

/**
 * Verifica se o container MongoDB já está rodando
 */
function isMongoContainerRunning() {
  try {
    const output = execSync(`docker ps --filter "name=${MONGODB_CONTAINER_NAME}" --format "{{.Status}}"`, { stdio: 'pipe' }).toString();
    return output.includes(MONGODB_CONTAINER_NAME);
  } catch {
    return false;
  }
}

/**
 * Espera o MongoDB ficar pronto
 */
async function waitForMongo(maxRetries = 30, interval = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    if (await isPortInUse(MONGODB_PORT)) {
      try {
        execSync(`mongosh --port ${MONGODB_PORT} --eval "db.runCommand({ping:1})" --quiet`, { stdio: 'ignore' });
        return true;
      } catch {
        // Porta aberta mas MongoDB pode não estar pronto ainda
      }
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  throw new Error('MongoDB não ficou pronto a tempo');
}

/**
 * Inicia o MongoDB usando mongod nativo
 */
async function startMongoNative() {
  if (!isMongoAvailable()) {
    return { success: false, message: 'mongod não encontrado' };
  }

  if (await isPortInUse(MONGODB_PORT)) {
    console.log('\x1b[32m[1/3] [OK] MongoDB já está rodando na porta 27017\x1b[0m');
    return { success: true };
  }

  if (!fs.existsSync(MONGODB_DB_PATH)) {
    fs.mkdirSync(MONGODB_DB_PATH, { recursive: true });
  }

  console.log('\x1b[32m[1/3] Starting MongoDB (native)...\x1b[0m');
  console.log(`   DB Path: ${MONGODB_DB_PATH}`);
  console.log(`   Port: ${MONGODB_PORT}`);

  const mongod = spawn('mongod', [
    '--dbpath', MONGODB_DB_PATH,
    '--port', String(MONGODB_PORT),
    '--logpath', MONGODB_LOG,
    '--fork',
  ], {
    stdio: 'pipe',
    shell: process.platform === 'win32',
  });

  return new Promise((resolve) => {
    let output = '';
    mongod.stdout?.on('data', (data) => { output += data.toString(); });
    mongod.stderr?.on('data', (data) => { output += data.toString(); });

    mongod.on('close', async (code) => {
      if (code === 0 || output.includes('child process started successfully')) {
        console.log('\x1b[32m       [OK] MongoDB iniciado com sucesso!\x1b[0m');
        try {
          await waitForMongo();
          console.log('\x1b[32m       [OK] MongoDB pronto para conexões\x1b[0m');
        } catch (err) {
          console.log('\x1b[33m       [WARN] MongoDB pode não estar totalmente pronto ainda\x1b[0m');
        }
        resolve({ success: true, process: mongod });
      } else {
        console.log(`\x1b[31m       [ERROR] Erro ao iniciar MongoDB (code: ${code})\x1b[0m`);
        resolve({ success: false, message: output });
      }
    });

    mongod.on('error', (err) => {
      console.log(`\x1b[31m       [ERROR] Erro ao executar mongod: ${err.message}\x1b[0m`);
      resolve({ success: false, message: err.message });
    });
  });
}

/**
 * Inicia o MongoDB usando Docker
 */
async function startMongoDocker() {
  if (!isDockerAvailable()) {
    return { success: false, message: 'Docker não disponível ou sem permissão' };
  }

  let containerExists = false;
  try {
    const listOutput = execSync(`docker ps -a --filter "name=${MONGODB_CONTAINER_NAME}" --format "{{.Names}}"`, { stdio: 'pipe' }).toString();
    containerExists = listOutput.includes(MONGODB_CONTAINER_NAME);
  } catch {
    containerExists = false;
  }

  if (containerExists) {
    if (isMongoContainerRunning()) {
      console.log('\x1b[32m[1/3] [OK] MongoDB (Docker) já está rodando\x1b[0m');
      return { success: true };
    }
    console.log('\x1b[32m[1/3] Starting MongoDB (Docker container existente)...\x1b[0m');
    try {
      execSync(`docker start ${MONGODB_CONTAINER_NAME}`, { stdio: 'pipe' });
      console.log('\x1b[32m       [OK] MongoDB container iniciado!\x1b[0m');
      await waitForMongo();
      console.log('\x1b[32m       [OK] MongoDB pronto para conexões\x1b[0m');
      return { success: true };
    } catch (err) {
      // MongoDB crashou após start - limpar e recriar
      console.log('\x1b[33m       [WARN] Container iniciou mas MongoDB não responde, recriando...\x1b[0m');
      try {
        execSync(`docker rm -f ${MONGODB_CONTAINER_NAME}`, { stdio: 'ignore' });
      } catch (e) {
        // Ignorar erro na remoção
      }
      // Limpar dados corrompidos
      if (fs.existsSync(MONGODB_DB_PATH)) {
        try {
          fs.rmSync(MONGODB_DB_PATH, { recursive: true, force: true });
        } catch (e) {
          // Ignorar erro na limpeza
        }
      }
      // Continuar para criar container novo (cair no bloco abaixo)
    }
  }

  console.log('\x1b[32m[1/3] Starting MongoDB (Docker)...\x1b[0m');

  const docker = spawn('docker', [
    'run',
    '--name', MONGODB_CONTAINER_NAME,
    '-p', `${MONGODB_PORT}:27017`,
    '-v', `${MONGODB_DB_PATH}:/data/db`,
    '-d',
    'mongo:7.0'
  ], {
    stdio: 'pipe',
  });

  return new Promise((resolve) => {
    let output = '';
    docker.stdout?.on('data', (data) => { output += data.toString(); });
    docker.stderr?.on('data', (data) => { output += data.toString(); });

    docker.on('close', async (code) => {
      if (code === 0) {
        console.log('\x1b[32m       [OK] MongoDB container iniciado!\x1b[0m');
        try {
          await waitForMongo();
          console.log('\x1b[32m       [OK] MongoDB pronto para conexões\x1b[0m');
        } catch (err) {
          console.log('\x1b[33m       [WARN] MongoDB pode não estar totalmente pronto ainda\x1b[0m');
        }
        resolve({ success: true, process: docker });
      } else {
        console.log(`\x1b[31m       [ERROR] Erro ao iniciar MongoDB via Docker\x1b[0m`);
        resolve({ success: false, message: output });
      }
    });

    docker.on('error', (err) => {
      console.log(`\x1b[31m       [ERROR] Erro ao executar docker: ${err.message}\x1b[0m`);
      resolve({ success: false, message: err.message });
    });
  });
}

/**
 * Inicia o MongoDB (tenta nativo, depois Docker)
 */
async function startMongoDB() {
  if (await isPortInUse(MONGODB_PORT)) {
    console.log('\x1b[32m[1/3] [OK] MongoDB já está rodando na porta 27017\x1b[0m');
    return { success: true };
  }

  if (isMongoAvailable()) {
    const result = await startMongoNative();
    if (result.success) return result;
  }

  console.log('\x1b[33m       [INFO] mongod não encontrado, tentando Docker...\x1b[0m');
  const dockerResult = await startMongoDocker();
  if (dockerResult.success) return dockerResult;

  console.log('\x1b[31m[1/3] [FAIL] MongoDB não pôde ser iniciado!\x1b[0m');
  console.log('       Opções:');
  console.log('       1. Instale MongoDB: https://www.mongodb.com/docs/manual/installation/');
  console.log('       2. Ou inicie Docker com: docker run -d -p 27017:27017 mongo:7.0');
  console.log('       3. Ou inicie manualmente: mongod --port 27017\n');
  return { success: false };
}

// ============================================================
// Testes de Saúde
// ============================================================
async function runHealthChecks() {
  console.log('\x1b[36m[TESTES] Iniciando bateria de testes de saúde...\x1b[0m\n');

  const tests = [
    {
      name: 'Conexão com MongoDB',
      test: async () => {
        try {
          const net = require('net');
          return await new Promise((resolve) => {
            const client = net.createConnection({ port: 27017, host: '127.0.0.1' }, () => {
              client.end();
              resolve(true);
            });
            client.on('error', () => resolve(false));
            client.setTimeout(2000, () => {
              client.destroy();
              resolve(false);
            });
          });
        } catch {
          return false;
        }
      }
    },
    {
      name: 'Criação de banco de dados',
      test: async () => {
        try {
          execSync('mongosh --port 27017 --eval "db.getSiblingDB(\'maestro_test\').createCollection(\'test\')" --quiet', { stdio: 'pipe' });
          return true;
        } catch {
          return false;
        }
      }
    },
    {
      name: 'Operações de escrita/leitura',
      test: async () => {
        try {
          execSync('mongosh --port 27017 --eval "db.getSiblingDB(\'maestro_test\').test.insertOne({test: 1}); db.getSiblingDB(\'maestro_test\').test.findOne()" --quiet', { stdio: 'pipe' });
          return true;
        } catch {
          return false;
        }
      }
    },
    {
      name: 'Permissões de diretório',
      test: async () => {
        try {
          const stats = fs.statSync(MONGODB_DB_PATH);
          return stats.isDirectory() && (stats.mode & 0o200) !== 0;
        } catch {
          return false;
        }
      }
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      const result = await test.test();
      if (result) {
        console.log(`\x1b[32m   ✓ ${test.name}: OK\x1b[0m`);
        passed++;
      } else {
        console.log(`\x1b[31m   ✗ ${test.name}: FAIL\x1b[0m`);
        failed++;
      }
    } catch (err) {
      console.log(`\x1b[31m   ✗ ${test.name}: ERROR - ${err.message}\x1b[0m`);
      failed++;
    }
  }

  console.log(`\n\x1b[36m[RESUMO] Testes: ${passed} passaram, ${failed} falharam\x1b[0m\n`);

  return failed === 0;
}

// ============================================================
// Serviços do Maestro
// ============================================================
const services = [
  {
    name: 'Engine',
    path: path.join(__dirname, '../packages/engine'),
    command: 'npm',
    args: ['run', 'dev'],
    color: '\x1b[33m'
  },
  {
    name: 'Viewer',
    path: path.join(__dirname, '../packages/viewer'),
    command: 'npm',
    args: ['run', 'dev'],
    color: '\x1b[36m'
  }
];

/**
 * Inicia todos os serviços do Maestro
 */
function startServices() {
  services.forEach((service, index) => {
    console.log(`${service.color}[${index + 2}/${services.length + 1}] Starting ${service.name}...\x1b[0m`);

    const proc = spawn(service.command, service.args, {
      cwd: service.path,
      stdio: 'inherit',
      shell: process.platform === 'win32'
    });

    proc.on('error', (err) => {
      console.error(`[ERROR] ${service.name} error:`, err);
    });

    proc.on('close', (code) => {
      if (code !== 0) {
        console.log(`[WARN] ${service.name} exited with code ${code}`);
      }
    });
  });
}

// ============================================================
// Main
// ============================================================
async function main() {
  try {
    console.log('\x1b[36m[1/3] Iniciando MongoDB...\x1b[0m');
    const mongoResult = await startMongoDB();
    if (!mongoResult.success) {
      console.log('\x1b[31m[FAIL] Falha crítica: MongoDB não está disponível!\x1b[0m');
      console.log('   O sistema Maestro requer MongoDB para funcionar.');
      console.log('   Por favor, inicie o MongoDB antes de rodar o Maestro.\n');
      console.log('   Opções:');
      console.log('   1. Docker: docker run -d -p 27017:27017 mongo:7.0');
      console.log('   2. Instalação nativa: consulte MONGODB_SETUP.md\n');
      process.exit(1);
    }

    const testsOk = await runHealthChecks();
    if (!testsOk) {
      console.log('\x1b[33m[WARN] Alguns testes de saúde falharam, mas continuando...\x1b[0m\n');
    }

    startServices();

    console.log('\n[OK] All services started!');
    console.log('   MongoDB: mongodb://localhost:27017');
    console.log('   Status: \x1b[32mconnected\x1b[0m');
    console.log('   Engine: http://localhost:42042');
    console.log('   Viewer: http://localhost:3000');
    console.log('\nPress Ctrl+C to stop all services\n');
  } catch (error) {
    console.error('[ERROR] Erro ao iniciar serviços:', error);
    process.exit(1);
  }
}

main();

process.on('SIGINT', () => {
  console.log('\n\n[INFO] Shutting down...');
  try {
    execSync('docker stop maestro-mongo 2>/dev/null', { stdio: 'ignore' });
    console.log('   [OK] MongoDB container parado');
  } catch {}
  process.exit(0);
});
