#!/usr/bin/env node

// Maestro - Start Script
// Inicia os serviços do ecossistema

const { spawn } = require('child_process');
const path = require('path');

console.log('🎼 Maestro BPMN - Starting...\n');

// Services configuration
const services = [
  {
    name: 'Viewer',
    path: path.join(__dirname, '../packages/viewer'),
    command: 'npm',
    args: ['run', 'dev'],
    color: '\x1b[36m' // cyan
  }
];

// Start all services
services.forEach((service, index) => {
  console.log(`${service.color}[${index + 1}/${services.length}] Starting ${service.name}...\x1b[0m`);
  
  const proc = spawn(service.command, service.args, {
    cwd: service.path,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });

  proc.on('error', (err) => {
    console.error(`❌ ${service.name} error:`, err);
  });

  proc.on('close', (code) => {
    if (code !== 0) {
      console.log(`⚠️  ${service.name} exited with code ${code}`);
    }
  });
});

console.log('\n✅ All services started!');
console.log('📺 Viewer: http://localhost:3000');
console.log('\nPress Ctrl+C to stop all services\n');

// Handle shutdown
process.on('SIGINT', () => {
  console.log('\n\n🛑 Shutting down...');
  process.exit(0);
});
