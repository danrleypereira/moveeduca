#!/bin/bash

# ===========================================
# Maestro BPMN - Script de Inicialização
# Sobe: MongoDB + Engine + Viewer
# ===========================================

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   Maestro BPMN - Starting All${NC}"
echo -e "${BLUE}========================================${NC}"

# Função para verificar se uma porta está em uso
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# ===========================================
# 1. Verificar/Iniciar MongoDB
# ===========================================
echo -e "\n${YELLOW}[1/3] MongoDB${NC}"

if check_port 27017; then
    echo -e "  ${GREEN}✓${NC} MongoDB já está rodando (porta 27017)"
else
    echo -e "  ${YELLOW}→${NC} Iniciando MongoDB..."
    if command -v mongod &> /dev/null; then
        mongod --dbpath ~/data/db --fork --logpath ~/logs/mongodb.log
        echo -e "  ${GREEN}✓${NC} MongoDB iniciado"
    else
        echo -e "  ${RED}✗${NC} MongoDB não encontrado. Instale ou verifique o caminho."
        echo -e "  ${YELLOW}→${NC} Docker: docker run -d -p 27017:27017 mongo"
    fi
fi

# ===========================================
# 2. Engine (porta 3001)
# ===========================================
echo -e "\n${YELLOW}[2/3] Engine (porta 3001)${NC}"

if check_port 3001; then
    echo -e "  ${GREEN}✓${NC} Engine já está rodando (porta 3001)"
else
    echo -e "  ${YELLOW}→${NC} Iniciando Engine..."
    cd packages/engine
    npm run dev &
    ENGINE_PID=$!
    cd ../..
    echo -e "  ${GREEN}✓${NC} Engine iniciado (PID: $ENGINE_PID)"
fi

# ===========================================
# 3. Viewer (porta 3000)
# ===========================================
echo -e "\n${YELLOW}[3/3] Viewer (porta 3000)${NC}"

if check_port 3000; then
    echo -e "  ${GREEN}✓${NC} Viewer já está rodando (porta 3000)"
else
    echo -e "  ${YELLOW}→${NC} Iniciando Viewer..."
    cd packages/viewer
    npm run dev &
    VIEWER_PID=$!
    cd ../..
    echo -e "  ${GREEN}✓${NC} Viewer iniciado (PID: $VIEWER_PID)"
fi

# ===========================================
# Resumo
# ===========================================
echo -e "\n${BLUE}========================================${NC}"
echo -e "${GREEN}   Todos os serviços iniciados!${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "  Viewer:  http://localhost:3000"
echo -e "  Engine:  http://localhost:3001"
echo -e "  MongoDB: localhost:27017"
echo -e "\n${YELLOW}Pressione Ctrl+C para parar${NC}"

# Aguarda indefinidamente (ou até Ctrl+C)
wait
