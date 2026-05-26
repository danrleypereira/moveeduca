# Maestro

Orquestrador de processos BPMN do Move & Educa. Monorepo npm workspaces com três pacotes internos.

## Pacotes

| Pacote | Nome npm | Porta | Função |
|--------|----------|-------|--------|
| `packages/engine` | `@maestro/engine` | 42042 | API REST e execução de workflows |
| `packages/viewer` | `vrv-bpmn` | 3000 | UI web para visualizar diagramas e instâncias |
| `packages/database` | `@maestro/database` | — | Persistência MongoDB (Mongoose) |

## Pré-requisitos

- Node.js 18+
- MongoDB na porta 27017 (nativo ou Docker `mongo:7.0`)

## Início rápido

```bash
cd maestro
npm install
node scripts/start.js
```

- Engine: http://localhost:42042/health
- Viewer: http://localhost:3000

## Variáveis de ambiente

**`packages/database/.env`**

```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=maestro
```

**`packages/engine/.env`** (workflow de e-mail)

```env
SENDGRID_API_KEY=...
SENDGRID_FROM_EMAIL=...
SENDGRID_FROM_NAME=MoveEduca
```

## API REST (Engine)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/health` | Saúde do serviço e MongoDB |
| GET | `/api/definitions` | Lista arquivos BPMN |
| GET | `/api/definitions/:fileName` | XML BPMN |
| GET | `/api/process` | Instâncias em execução |
| GET | `/api/process/:instanceId/status` | Status de uma instância |
| POST | `/api/process/start` | Inicia processo `{ "bpmnFile": "ping.bpmn" }` |
| POST | `/api/process/:bpmnFile/execute` | Inicia processo por nome de arquivo |
| DELETE | `/api/process` | Limpa instâncias |

O Viewer expõe proxy em `/api/engine/*` e leituras em `/api/instances*`.

## Estado atual

- Protótipo funcional: workflows `ping.bpmn` e `teste_de_email.bpmn` executam scripts dedicados.
- Diagramas organizacionais (`art_*.bpmn`) existem no viewer e em `workflows/`, mas **não executam** genericamente ainda.
- `bpmn-engine` está instalado porém não integrado ao fluxo principal.
- Sem autenticação, testes automatizados ou OpenAPI.

## Arquitetura

```
┌─────────┐      ┌─────────┐      ┌──────────┐
│ Viewer  │ ───► │ Engine  │ ───► │ Database │
│  :3000  │      │ :42042  │      │ MongoDB  │
└─────────┘      └─────────┘      └──────────┘
```

O Viewer faz proxy de `/api/engine/*` para o Engine. Definições BPMN organizacionais estão em `../workflows/processos/` (sincronizar com o engine — ver `plan.md`).

## Script `start.js`

1. Verifica/inicia MongoDB (porta 27017; nativo ou Docker `mongo:7.0`)
2. Testes de saúde (conexão e CRUD)
3. Sobe Engine e Viewer

Suportado em Linux/macOS (use WSL2 no Windows).

## Roadmap

Ver **`plan.md`** neste diretório para o plano completo de upgrade, API event-driven e integração com website/app mobile.

## Dados em runtime

```
maestro/data/
├── mongodb/
└── mongodb.log
```

Criados automaticamente por `scripts/start.js` (não versionados).
