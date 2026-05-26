# Maestro — Plano de Upgrade

Documento de referência para evoluir o Maestro de protótipo para plataforma de orquestração de processos, com API reutilizável, integração event-driven e consumo por website, app mobile e sistemas externos.

**Data:** 2026-05-24  
**Estado atual:** protótipo npm workspaces (engine + viewer + database), MongoDB, 2 workflows executáveis, 12 diagramas organizacionais estáticos.

---

## 1. Diagnóstico do estado atual

### O que funciona

- Monorepo npm workspaces com separação engine / viewer / database.
- Persistência de instâncias em MongoDB via `ProcessInstanceRepository`.
- Padrão SnapshotManager + callback de sync para DB (reutilizável).
- REST API básica no engine (porta 42042) e proxy no viewer (3000).
- Scripts de demo: `ping.bpmn`, `teste_de_email.bpmn`.

### Problemas críticos

| Área | Problema |
|------|----------|
| Execução BPMN | `bpmn-engine` importado mas não usado; `art_*.bpmn` não executam |
| Definições | 3 cópias dos BPMN (`workflows/`, viewer, engine) dessincronizadas |
| Documentação | README raiz cita PostgreSQL/TypeORM; código usa MongoDB |
| Segurança | Sem auth, CORS aberto, e-mail/IP hardcoded |
| Testes | Zero cobertura automatizada |
| Naming | Viewer ainda se chama `vrv-bpmn` |
| Config | Portas hardcoded; env vars documentadas mas não lidas |

### Código reutilizável existente

- `@maestro/database` — conexão, schema, repository (extrair para pacote estável).
- `SnapshotManager` — máquina de estados em memória + log (base para event sourcing leve).
- `EngineManager` + scripts `ping.ts` / `email.ts` — padrão de task handlers (generalizar).
- `email-template.ts` — templates de notificação.
- `WebServer` proxy pattern — útil até API gateway dedicado existir.

---

## 2. Objetivos de produto

1. **Executar** os 12 processos organizacionais definidos em `workflows/processos/`.
2. **Expor API REST + eventos** para website, app mobile e integrações externas.
3. **Integrar** formulários do website (doação, associação, serviços) como start events.
4. **Garantir** rastreabilidade, auditoria e conformidade com documentos em `documentos/`.
5. **Permitir** evolução independente de UI (viewer) e motor (engine).

---

## 3. Decisão de stack — Frontend (Viewer)

### Opções avaliadas

| Critério | Vue 3 | React | Angular |
|----------|-------|-------|---------|
| Alinhamento com website | **Alto** (já Vue 2) | Médio | Baixo |
| Ecossistema BPMN UI | bpmn-js, bpmn-visualization | bpmn-js, react-bpmn | limitado |
| Curva para equipe | Baixa se migrar Vue 2→3 | Média | Alta |
| SSR/SSG | Nuxt 3 | Next.js | Angular Universal |

### Recomendação: **Vue 3 + Vite** (SPA administrativa)

**Por quê SPA e não SSR/SSG/ISR:**

- O viewer é **painel interno/admin** (operadores, auditores), não conteúdo público indexável.
- Não há SEO; autenticação e dados em tempo real predominam.
- SSR (Nuxt) só se justifica se o viewer virar portal público de transparência — fase 2.

**Renderização recomendada por superfície:**

| Superfície | Estratégia |
|------------|------------|
| Maestro Viewer (admin) | **SPA** (Vue 3 + Vite) |
| Website institucional | Manter **SPA estática** (Firebase) até upgrade Vue 3; depois considerar **SSG** para páginas institucionais |
| Formulários públicos | **SPA** com chamadas API ao Maestro |
| App mobile | **Nativo/híbrido** consumindo API REST + webhooks |

**Incremental Static Generation (ISR)** não se aplica ao Maestro viewer. Pode ser útil no website para páginas de projetos estáticas no futuro (Next/Nuxt), mas não é prioridade.

### Plano de migração do viewer

1. Renomear pacote para `@maestro/viewer`.
2. Substituir `viewer.html` monolítico (~1.7k linhas) por app Vue 3 modular.
3. Manter `bpmn-visualization` ou migrar para `bpmn-js` + overlays customizados.
4. Extrair componentes: DiagramPicker, InstanceList, InstanceDetail, HealthDashboard.

---

## 4. Decisão de stack — Backend (Engine)

### Recomendação: **Node.js + TypeScript + Express/Fastify** (evoluir o existente)

Alternativas descartadas para curto prazo:

- **Camunda 8 / Zeebe:** robusto, porém operação pesada e licenciamento a avaliar.
- **Temporal:** excelente para workflows code-first, mas migração BPMN seria costosa.
- **Rewrite em Go/Rust:** YAGNI neste estágio.

### Motor BPMN

**Fase 1:** Integrar **`bpmn-engine`** (já na dependência) para parsing e execução genérica de fluxos simples (start → tasks → gateways → end).

**Fase 2:** Para user tasks, timers e compensação avançada, avaliar:

- Camunda 8 (self-hosted ou SaaS), ou
- Zeebe + Tasklist, ou
- Extensão customizada sobre bpmn-engine com task registry.

**Fase 3:** Mapear cada `Service Task` / `Script Task` do BPMN para handlers TypeScript registrados (padrão já iniciado em `ping.ts` / `email.ts`).

---

## 5. API reutilizável e event-driven

### 5.1 REST API (v1) — contrato proposto

Base URL: `https://api.moveeduca.org.br/maestro/v1` (ou subpath atrás de API Gateway).

```
POST   /processes/{processKey}/instances     # Inicia instância
GET    /instances                             # Lista (filtros: status, processKey, date)
GET    /instances/{id}                        # Detalhe + histórico
GET    /instances/{id}/tasks                  # User tasks pendentes
POST   /instances/{id}/tasks/{taskId}/complete
POST   /instances/{id}/signal                 # Correlaciona evento externo
GET    /definitions                           # Lista processos disponíveis
GET    /definitions/{key}/diagram             # BPMN XML
GET    /health
```

**Autenticação:** API keys para integrações (mobile, website backend); OAuth2/JWT para usuários humanos no viewer.

**Idempotência:** header `Idempotency-Key` em POST de criação (mobile offline-friendly).

### 5.2 Event-driven

**Padrão recomendado:** Outbox + message broker.

```
Engine → outbox table (MongoDB) → publisher → Redis Streams / RabbitMQ / Google Pub/Sub
                                              ↓
                                    subscribers (email, website, mobile push, audit)
```

**Eventos de domínio (exemplos):**

- `process.instance.started`
- `process.instance.completed`
- `process.instance.failed`
- `process.task.created` (user task)
- `process.task.completed`
- `donation.received`
- `member.application.submitted`

**Webhook outbound:** configurável por integração (`POST` com HMAC signature).

**Integração website (futuro):**

```
Formulário Vue → Firebase Function (validação) → POST Maestro API
                                              ← webhook status update
```

**Integração mobile:**

```
App → POST /processes/associados/instances
    ← polling ou push via FCM quando task/user action needed
```

### 5.3 Pacote compartilhado

Criar `@maestro/api-client` (TypeScript):

- SDK para website, mobile (via OpenAPI generator → Swift/Kotlin), scripts internos.
- Publicar OpenAPI 3.1 a partir do Express/Fastify.

---

## 6. Dados e infraestrutura

### Banco de dados

**Manter MongoDB** no curto prazo (já implementado). Documentar decisão e corrigir README.

**Médio prazo:** avaliar PostgreSQL para:

- Outbox pattern relacional
- Relatórios financeiros/audit
- Ou manter MongoDB + collection `outbox` + índices TTL

Não migrar para PostgreSQL só por documentação desatualizada — migrar se houver necessidade de transações multi-documento ou reporting SQL.

### Deploy alvo

| Componente | Dev | Produção sugerida |
|------------|-----|-------------------|
| Engine | `start.js` local | Cloud Run / Fly.io / VPS container |
| Viewer | local :3000 | Firebase Hosting ou Cloud Run (SPA) |
| MongoDB | local/Docker | MongoDB Atlas |
| Broker | — | Redis / Pub/Sub |
| API Gateway | — | Cloudflare / GCP API Gateway |

---

## 7. Unificação de BPMN

**Fonte única:** `workflows/processos/`

Pipeline proposto:

```
workflows/processos/**/*.bpmn
        │
        ├─ copy/sync → maestro/packages/engine/bpmn-definitions/
        └─ copy/sync → maestro/packages/viewer/src/bpmn-definitions/
```

Implementar script `maestro/scripts/sync-bpmn.js` no CI (prebuild).

Remover duplicatas manuais; validar XML com teste CI.

---

## 8. Roadmap por fases

### Fase 0 — Fundação (2–3 semanas)

- [ ] Corrigir README raiz e maestro (MongoDB, portas).
- [ ] Renomear `vrv-bpmn` → `@maestro/viewer`.
- [ ] Script sync BPMN de `workflows/`.
- [ ] Remover código morto (`bpmn-engine` import não usado ou integrar).
- [ ] Env config centralizado (`ENGINE_PORT`, `VIEWER_PORT`, `MONGODB_URI`).
- [ ] Desabilitar Dependabot auto-PRs (feito em `.github/dependabot.yml`).
- [ ] Testes unitários: `ProcessInstanceRepository`, `SnapshotManager`.

### Fase 1 — Execução genérica (4–6 semanas)

- [ ] Integrar `bpmn-engine` para fluxos sem user task complexa.
- [ ] Task handler registry (map activityId → handler module).
- [ ] Executar pelo menos 3 processos `art_*` piloto (doações, associados, financeira).
- [ ] OpenAPI spec v1 + `@maestro/api-client`.
- [ ] Auth: API key mínima.

### Fase 2 — Event-driven (3–4 semanas)

- [ ] Outbox + publisher (Redis ou Pub/Sub).
- [ ] Webhooks configuráveis.
- [ ] Eventos documentados (AsyncAPI opcional).
- [ ] Integração piloto: formulário website → Maestro (1 fluxo).

### Fase 3 — Viewer Vue 3 (4–6 semanas)

- [ ] SPA Vue 3 + Vite substituindo viewer.html.
- [ ] Auth OAuth2 para operadores.
- [ ] Dashboard de instâncias, diagrama com highlight de nós ativos.

### Fase 4 — Mobile + website completo (contínuo)

- [ ] SDK mobile gerado da OpenAPI.
- [ ] Fluxos: doação, associe-se, contratação serviços.
- [ ] Notificações push para user tasks.

### Fase 5 — Compliance e hardening

- [ ] Audit log imutável.
- [ ] RBAC por papel (associado, diretor, conselho fiscal).
- [ ] Revisão jurídica/tributária dos processos (ver `workflows/prompt-analysis.md`).
- [ ] Pen test API.

---

## 9. Reuso entre Maestro e Website

| Ativo | Reuso |
|-------|-------|
| i18n pt/en | Conceitos, não código (website Vue 2, maestro TS). |
| `@maestro/api-client` | Website chama via Functions proxy (esconder API key). |
| Templates e-mail | Mover para pacote `@maestro/notifications`. |
| Design system | Vuetify 3 compartilhado se viewer for Vue; website migra Vue 3 depois. |
| BPMN definitions | `workflows/` única fonte. |
| Documentos legais | `documentos/` referenciados por handlers de compliance. |

**Não unificar** website e maestro em um único app SPA — domínios e audiências diferentes.

---

## 10. Riscos

| Risco | Mitigação |
|-------|-----------|
| BPMN complexo demais para bpmn-engine | Piloto por processo; fallback Camunda |
| Vue 2 website bloqueia integração moderna | Proxy via Firebase Functions; migrar website em paralelo |
| Processos BPMN divergem da lei | Análise dedicada + revisão jurídica |
| MongoDB sem transações multi-doc | Outbox idempotente; ou PostgreSQL para outbox |
| Scope creep | Fases com entregáveis mensuráveis |

---

## 11. Métricas de sucesso

- 12/12 processos `art_*` iniciáveis via API.
- Website dispara ≥3 fluxos sem intervenção manual.
- Mobile dispara ≥1 fluxo com confirmação webhook.
- 80%+ cobertura em repository + handlers críticos.
- Tempo médio de onboarding de novo processo < 1 dia (handler + BPMN sync).

---

## 12. Referências no repositório

- Engine API: `maestro/packages/engine/src/EngineServer.ts`
- Persistência: `maestro/packages/database/`
- Viewer: `maestro/packages/viewer/src/`
- BPMN canônico: `workflows/processos/`
- Documentos legais: `documentos/`
- Análise de processos: `workflows/prompt-analysis.md`
