# Workflows

Definições BPMN 2.0 dos processos organizacionais do Move & Educa. Este diretório é a **fonte canônica** dos diagramas de processo.

## Estrutura

```
workflows/processos/
├── assembleia/
├── associados/
├── auditoria/
├── bens/
├── capacitação/
├── comunicação/
├── contratar servicos/
├── dissolução e reestruturação/
├── doações/
├── eleição/
├── Financeira/
└── parcerias/
```

Cada pasta contém um arquivo `art_*.bpmn` modelado no Camunda Modeler.

## Processos modelados

| Processo | Arquivo |
|----------|---------|
| Assembleias | `assembleia/art_assembleia.bpmn` |
| Associados | `associados/art_associados.bpmn` |
| Auditoria e Compliance | `auditoria/art_auditoria e compilance.bpmn` |
| Aquisição de Bens | `bens/art_adiquirir_bens.bpmn` |
| Capacitação | `capacitação/art_capacitação.bpmn` |
| Comunicação | `comunicação/art_comunicacção.bpmn` |
| Contratação de Serviços | `contratar servicos/art_servicos.bpmn` |
| Dissolução e Reestruturação | `dissolução e reestruturação/art_dissolucao e reestruturacao.bpmn` |
| Doações | `doações/art_ProcessoDoacoesSimplificado.bpmn` |
| Eleição | `eleição/art_eleicao.bpmn` |
| Financeira | `Financeira/art_financeira.bpmn` |
| Parcerias | `parcerias/art_parcerias.bpmn` |

## Duplicação conhecida

Cópias desses diagramas também existem em `maestro/packages/viewer/src/bpmn-definitions/`. Ao alterar um processo, atualize **ambos** ou (preferencialmente) centralize em `workflows/` e sincronize para o Maestro — ver `maestro/plan.md`.

## Ferramentas

- **Autoria:** [Camunda Modeler](https://camunda.com/download/modeler/) 5.x
- **Execução (futuro):** Maestro (`maestro/`)

## Análise de processos

Para revisão jurídica, tributária e operacional detalhada, use o prompt em `prompt-analysis.md` (agente dedicado).
