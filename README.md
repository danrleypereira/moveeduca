# Move & Educa

<div align="center">

**Movimento em Defesa da Educação**

![Vue.js](https://img.shields.io/badge/Vue.js-2.x-42b883?style=flat-square&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18.x_LTS-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Maestro-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Hosting_+_Functions-ffca28?style=flat-square&logo=firebase&logoColor=black)
![BPMN](https://img.shields.io/badge/BPMN-2.0-ff6b35?style=flat-square)
![License](https://img.shields.io/badge/License-All_Rights_Reserved-red?style=flat-square)

</div>

Monorepo da organização: site institucional, orquestrador de processos (BPMN), definições de workflows e documentos oficiais.

## Módulos

| Módulo | Descrição | Documentação |
|--------|-----------|--------------|
| [website/](website/) | Site institucional (Vue 2 + Firebase) | [website/README.md](website/README.md) |
| [maestro/](maestro/) | Engine, viewer e persistência de processos | [maestro/README.md](maestro/README.md) · [maestro/plan.md](maestro/plan.md) |
| [workflows/](workflows/) | Diagramas BPMN dos processos organizacionais | [workflows/README.md](workflows/README.md) |
| [documentos/](documentos/) | Estatuto e documentos institucionais (LaTeX/PDF) | [documentos/README.md](documentos/README.md) |

## Estrutura

```
moveeduca/
├── documentos/
├── workflows/
├── maestro/
├── website/
├── firebase.json      # Hosting + Cloud Functions
└── README.md
```

## Início rápido

```bash
git clone https://github.com/danrleypereira/moveeduca.git
cd moveeduca
```

Cada módulo tem seus próprios pré-requisitos, scripts e configuração — consulte o README do módulo.

**Deploy do site (raiz do repo):**

```bash
cd website && yarn install && yarn build
cd .. && firebase deploy
```

## Manutenção

- Atualizações de dependências são feitas **manualmente** (Dependabot auto-PRs desabilitados em `.github/dependabot.yml`).

## Contato

[moveeduca.org.br](https://moveeduca.org.br) · [contato@moveeduca.org.br](mailto:contato@moveeduca.org.br)

*© Move & Educa — All Rights Reserved*
