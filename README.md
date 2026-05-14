# Move & Educa

<div align="center">

**Movimento em Defesa da Educação**


![Vue.js](https://img.shields.io/badge/Vue.js-2.x-42b883?style=flat-square&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18.x_LTS-339933?style=flat-square&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169e1?style=flat-square&logo=postgresql&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Hosting_+_Functions-ffca28?style=flat-square&logo=firebase&logoColor=black)
![BPMN](https://img.shields.io/badge/BPMN-2.0_Engine-ff6b35?style=flat-square)
![License](https://img.shields.io/badge/License-All_Rights_Reserved-red?style=flat-square)

</div>

---

## 📦 Módulos

| | Módulo | Descrição |
|--|--------|-----------|
| 🌐 | **Website** | Site institucional em Vue.js, hospedado no Firebase |
| ⚙️ | **Maestro** | Orquestrador de processos BPMN da organização |
| 🔀 | **Workflows** | Definições BPMN dos processos organizacionais |
| 📄 | **Documentos** | Estatuto e documentos oficiais |

---

## 🗂️ Estrutura do Repositório

```
moveeduca/
├── documentos/       # Documentos oficiais (Estatuto, etc.)
├── workflows/        # Definições BPMN dos processos organizacionais
├── maestro/          # Orquestrador de processos BPMN
│   └── packages/
│       ├── database/ # Camada de dados (TypeORM + PostgreSQL)
│       ├── engine/   # Motor de execução de workflows
│       └── viewer/   # Interface visual de workflows
└── website/          # Site institucional (Vue.js + Firebase)
```

---

## 🚀 Instalação

**Pré-requisitos:** Node.js 18.x LTS · npm 9.x ou yarn 1.22+ · PostgreSQL · Firebase CLI

```bash
# Clonar o repositório
git clone https://github.com/moveeduca/moveeduca.git
cd moveeduca

# Website
cd website && yarn install

# Maestro
cd ../maestro && yarn install
```

---

## ⚙️ Configuração

<details>
<summary><strong>Website</strong> — <code>.env</code> em <code>website/</code></summary>

```env
VUE_APP_FIREBASE_API_KEY=sua-api-key
VUE_APP_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
VUE_APP_FIREBASE_PROJECT_ID=seu-projeto
VUE_APP_FIREBASE_APP_ID=seu-app-id
```
</details>

<details>
<summary><strong>Maestro</strong> — <code>.env</code> em <code>maestro/</code></summary>

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/maestro
ENGINE_PORT=3000
VIEWER_PORT=3001
```
</details>

<details>
<summary><strong>SendGrid</strong> — Firebase Functions</summary>

```bash
firebase functions:config:set sendgrid.apikey="SG.sua-api-key"
```
</details>

---

## ▶️ Uso

### Website

```bash
cd website
yarn serve      # Desenvolvimento → http://localhost:8080
yarn build      # Build de produção
firebase deploy # Deploy completo
```

### Maestro

```bash
cd maestro
node scripts/start.js        # Inicialização completa (Linux/macOS)

# Módulos individuais
cd packages/engine && yarn dev
cd packages/viewer && yarn dev
```

> **Nota:** O script `start.js` utiliza sinais Unix (SIGINT) e chamadas de sistema específicas para gerenciamento de processos. É suportado apenas em sistemas Linux e macOS. No Windows, utilize WSL2 ou inicie os serviços manualmente.

---

## 🏗️ Arquitetura do Maestro

O Maestro orquestra todos os processos organizacionais via BPMN 2.0.

```
┌─────────┐      ┌─────────┐      ┌──────────┐
│ Viewer  │ ───► │ Engine  │ ───► │ Database │
│         │      │         │      │          │
│ HTTP API│      │Workflows│      │PostgreSQL│
└─────────┘      └─────────┘      └──────────┘
```

---

## 🔀 Workflows

Os workflows modelam todos os processos de tomada de decisão da organização em BPMN 2.0. Cada workflow é modelado seguindo o padrão BPMN 2.0 e executado pelo Maestro para garantir rastreabilidade e transparência em todas as operações.

| 📋 Workflow | 📁 Arquivo |
|------------|-----------|
| Assembleias | `art_assembleia.bpmn` |
| Associados | `art_associados.bpmn` |
| Auditoria e Compliance | `art_auditoria e compilance.bpmn` |
| Capacitação | `art_capacitacao.bpmn` |
| Comunicação | `art_comunicacção.bpmn` |
| Dissolução e Reestruturação | `art_dissolucao e reestruturacao.bpmn` |
| Eleição | `art_eleicao.bpmn` |
| Financeira | `art_financeira.bpmn` |
| Parcerias | `art_parcerias.bpmn` |
| Serviços | `art_servicos.bpmn` |
| Doações | `art_ProcessoDoacoesSimplificado.bpmn` |
| Aquisição de Bens | `art_adiquirir_bens.bpmn` |

**Localização:** `maestro/packages/viewer/src/bpmn-definitions/`

---

## ⚙️ Detalhamento do Maestro

O Maestro é o orquestrador de processos da organização. Utiliza workflows modelados em BPMN para automatizar e padronizar todas as operações, garantindo que votações, aprovações, consultorias e auditorias sejam realizadas com o mínimo de burocracia e o máximo de rastreabilidade.

### Script de Inicialização

O comando `node scripts/start.js` executa a seguinte sequência:

1. **Verificação do MongoDB**
   - Verifica se já existe processo na porta 27017
   - Se não houver, tenta iniciar `mongod` nativo
   - Se `mongod` não estiver disponível, tenta usar Docker (container `maestro-mongo` com imagem `mongo:7.0`)
   - Se Docker não estiver disponível ou sem permissão, retorna erro

2. **Testes de Saúde**
   - Testa conexão com MongoDB
   - Verifica capacidade de criar banco de dados
   - Valida operações de escrita/leitura
   - Confirma permissões do diretório de dados

3. **Início dos Serviços**
   - Engine: disponível em `http://localhost:42042`
   - Viewer: disponível em `http://localhost:3000`

### Pré-requisitos para Execução

| Recurso | Obrigatório | Descrição |
|---------|-------------|------------|
| MongoDB | Sim | Porta 27017 (mongod nativo ou Docker) |
| Docker | Não | Usado como fallback se mongod não estiver disponível |
| Node.js 18+ | Sim | Para executar o script |



### Estrutura de Dados

O Maestro cria os seguintes diretórios automaticamente:

```
maestro/
+-- data/
|      +-- mongodb/           # Dados do MongoDB
|      +-- mongodb.log         # Log do MongoDB
```

Os workflows modelam todos os processos de tomada de decisão da organização em BPMN 2.0.

| 📋 Workflow | 📁 Arquivo |
|------------|-----------|
| Assembleias | `art_assembleia.bpmn` |
| Associados | `art_associados.bpmn` |
| Auditoria e Compliance | `art_auditoria e compilance.bpmn` |
| Capacitação | `art_capacitacao.bpmn` |
| Comunicação | `art_comunicacção.bpmn` |
| Dissolução e Reestruturação | `art_dissolucao e reestruturacao.bpmn` |
| Eleição | `art_eleicao.bpmn` |
| Financeira | `art_financeira.bpmn` |
| Parcerias | `art_parcerias.bpmn` |
| Serviços | `art_servicos.bpmn` |
| Doações | `art_ProcessoDoacoesSimplificado.bpmn` |
| Aquisição de Bens | `art_adiquirir_bens.bpmn` |

---

## 📬 Contato

<div align="center">

🌐 [moveeduca.org.br](https://moveeduca.org.br) · ✉️ [contato@moveeduca.org.br](mailto:contato@moveeduca.org.br)

*© Move & Educa — All Rights Reserved*

</div>