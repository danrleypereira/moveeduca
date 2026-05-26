# Prompt — Análise aprofundada dos processos BPMN

Use este prompt com um agente dedicado (modo análise, somente leitura inicial) para revisar todos os processos organizacionais do Move & Educa.

---

## Contexto para o agente

Você está analisando o repositório **Move & Educa** (`moveeduca`), uma OSC (organização da sociedade civil) brasileira focada em educação. O diretório `workflows/processos/` contém **12 diagramas BPMN 2.0** que modelam processos de governança, financeiro, associados, doações, parcerias, eleições, assembleias, auditoria, comunicação, capacitação, aquisição de bens, dissolução/reestruturação e contratação de serviços.

Documentos legais de referência estão em `documentos/`:

- `Estatuto.tex` / `Estatuto.pdf`
- `Regimento Interno.tex`
- `Politicas Institucionais.tex`
- `Politica Financeira.tex`
- `Termo de Doacao.tex`
- `Termo de Declaracao de Conflito de Interesses.tex`

O motor de execução (Maestro) está em `maestro/` — **não implemente código nesta tarefa; foque em análise.** O website em `website/` integrará fluxos no futuro.

**Jurisdição:** Brasil (legislação federal; atenção especial a OSCs, Categoria civil, MROSC, CEBAS se aplicável, LGPD, Marco Civil, Código Civil, Lei 13.019/2014 de parcerias, legislação eleitoral para processos internos de eleição, normas contábeis para terceiro setor).

---

## Sua missão

Realize uma **análise exaustiva** de cada processo BPMN em `workflows/processos/**/*.bpmn`, cruzando com os documentos em `documentos/` e com a legislação brasileira aplicável.

Entregue um relatório estruturado (Markdown) com achados acionáveis para diretoria, conselho fiscal e equipe técnica.

---

## Escopo da análise (por processo)

Para **cada** arquivo BPMN, analise:

### 1. Completude e clareza operacional

- O fluxo cobre happy path e exceções?
- Há dead ends, loops infinitos ou gateways ambíguos?
- Roles/responsáveis estão definidos (lanes/pools)?
- SLAs, prazos legais e timers estão modelados?
- Documentos obrigatórios (atas, termos, comprovantes) estão referenciados?
- Pontos de integração com sistemas (website, banco, e-mail, votação) estão identificados?

### 2. Conformidade legal (Brasil)

- Compatibilidade com o **Estatuto** e **Regimento Interno** do Move & Educa.
- **Associações civis** (Código Civil arts. 53–61): assembleias, quórum, deliberações, destituição, dissolução.
- **MROSC / CEBAS** (se aplicável): prestação de contas, impedimentos, conflito de interesses.
- **Lei 13.019/2014** (parcerias com governo): onde processos de parceria/serviços tangem recursos públicos.
- **LGPD** (Lei 13.709/2018): tratamento de dados pessoais em cadastros, doações, comunicação.
- **Legislação eleitoral**: cuidado com processos internos de "eleição" que possam confundir-se com campanha política; neutralidade política declarada nos valores institucionais.
- **Lei de Incentivo / doações**: requisitos de recibo, transparência, restrições a doadores.
- **Conflito de interesses**: alinhamento com termo específico em `documentos/`.
- **Trabalho voluntário vs. vínculo empregatício** (processos de capacitação/serviços).
- **Licitação / contratação** (Lei 14.133/2021) se processos envolverem contratos públicos ou uso de recursos públicos.

### 3. Conformidade financeira e tributária

- **Impostos**: ISS, IRRF, INSS, PIS/COFINS/CSLL onde houver pagamento a PF/PJ.
- **Nota fiscal** e comprovação de despesas (Política Financeira).
- **Assinatura conjunta** Presidente + Diretor Financeiro (Estatuto art. 37).
- **Limites de alçada** por valor de despesa.
- **Prestação de contas** a conselho fiscal e assembleia.
- **Doações dedutíveis** (IRPF/IRPJ) — requisitos de emissão de recibo e registro.
- **Certificação CEBAS** (se objetivo): requisitos de destinação de excedentes.
- **PIX/contas bancárias** e rastreabilidade.
- **Retenções na fonte** em contratação de serviços (PF autônomo vs. PJ).

### 4. Riscos e nuances

- Onde o processo BPMN **diverge** do Estatuto ou Política Financeira?
- Onde a automação (Maestro) pode **violar** requisito legal se mal implementada?
- Cenários de **conflito de interesse** não tratados.
- **Quórum** insuficiente em deliberações simuladas.
- **Prazos legais** (ex.: convocação de assembleia, registro cartorário).
- **Proteção de dados** insuficiente (dados sensíveis de associados, famílias carentes).
- **Responsabilidade solidária** de dirigentes em atos ultra vires.

### 5. Integração futura (website / mobile / Maestro)

- Quais eventos devem ser expostos via API?
- Quais etapas exigem **user task** humana vs. automação?
- Quais formulários do website (`website/src/views/pages/Formulario.vue`, fluxos de doação/associação) mapeiam para qual start event?
- Riscos de **disparo indevido** de processos por API pública.

---

## Processos a analisar (checklist)

| # | Pasta | Arquivo |
|---|-------|---------|
| 1 | `assembleia/` | `art_assembleia.bpmn` |
| 2 | `associados/` | `art_associados.bpmn` |
| 3 | `auditoria/` | `art_auditoria e compilance.bpmn` |
| 4 | `bens/` | `art_adiquirir_bens.bpmn` |
| 5 | `capacitação/` | `art_capacitação.bpmn` |
| 6 | `comunicação/` | `art_comunicacção.bpmn` |
| 7 | `contratar servicos/` | `art_servicos.bpmn` |
| 8 | `dissolução e reestruturação/` | `art_dissolucao e reestruturacao.bpmn` |
| 9 | `doações/` | `art_ProcessoDoacoesSimplificado.bpmn` |
| 10 | `eleição/` | `art_eleicao.bpmn` |
| 11 | `Financeira/` | `art_financeira.bpmn` |
| 12 | `parcerias/` | `art_parcerias.bpmn` |

---

## Formato de entrega esperado

Crie um relatório `workflows/processos/ANALISE.md` (ou múltiplos arquivos por processo) com:

```markdown
# Análise de Processos — Move & Educa

## Resumo executivo
(Top 10 riscos cross-cutting, priorizados P0/P1/P2)

## Matriz de conformidade
| Processo | Legal | Financeiro | LGPD | Alinhamento Estatuto | Nota |

## Detalhamento por processo

### [Nome do processo]
- **Arquivo:** ...
- **Objetivo do fluxo:** ...
- **Achados legais:** ...
- **Achados financeiros/tributários:** ...
- **Gaps no BPMN:** ...
- **Recomendações:** (ação, responsável sugerido, urgência)
- **Perguntas em aberto** para advices/jurídico externo

## Inconsistências entre processos
## Inconsistências BPMN vs documentos/
## Recomendações para implementação no Maestro
## Referências legais citadas (links oficiais quando possível)
```

---

## Regras de conduta da análise

1. **Não assuma** que a OSC possui CEBAS ou certificações — indique "verificar status" quando aplicável.
2. **Cite** artigos/cláusulas do Estatuto quando comparar com BPMN.
3. **Diferencie** exigência legal de boa prática recomendada.
4. **Sinalize** quando a análise exigir advogado contábil/contador registrado (CRC) — você não substitui parecer profissional.
5. Leia os XMLs BPMN **e** os `.tex` em `documentos/` (ou PDFs se LaTeX indisponível).
6. Compare também cópias em `maestro/packages/viewer/src/bpmn-definitions/` se houver divergência de versão.
7. Ignore workflows de demo (`ping.bpmn`, `teste_de_email.bpmn`) salvo como referência técnica.

---

## Perguntas guia transversais

- Os processos garantem **rastreabilidade** exigida por conselho fiscal e assembleia?
- Há **segregação de funções** (quem solicita ≠ quem aprova ≠ quem paga)?
- Doações e despesas têm **trilha de auditoria** completa?
- Comunicações respeitam **neutralidade política** e LGPD?
- Processos de **dissolução** cobrem destinação de patrimônio conforme Código Civil?
- Eleições internas têm **impugnação, apuração e registro** adequados?

---

## Priorização sugerida para revisão

1. **P0:** Financeira, Doações, Assembleia, Associados
2. **P1:** Eleição, Auditoria, Parcerias, Aquisição de Bens
3. **P2:** Comunicação, Capacitação, Serviços, Dissolução

---

## Início

Comece listando todos os arquivos em `workflows/processos/`, leia `documentos/Estatuto.tex` e `documentos/Politica Financeira.tex`, depois analise processo a processo na ordem de priorização P0 → P2.

Registre **todas** as nuances, mesmo as que parecem menores — em OSCs, detalhes de quórum, prazo e documentação costumam gerar invalidação de atos ou questionamento fiscal.
