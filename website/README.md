# Website

Site institucional do Move & Educa — Vue 2 + Vuetify 2, hospedado no Firebase Hosting com Cloud Functions para envio de e-mail.

## Stack

- Vue 2.6, Vue Router 3 (history mode)
- Vuetify 2.6
- Vue CLI 3 / Webpack 4
- Firebase Hosting + Functions (Node 22)
- SendGrid (via Cloud Function)

## Pré-requisitos

- Node.js 16.x (ver `website/.nvmrc`) — Webpack 4 exige `--openssl-legacy-provider`
- Firebase CLI
- Yarn 1.x ou npm

## Desenvolvimento

```bash
cd website
yarn install
yarn serve    # http://localhost:8080
```

O script `copy-estatuto.js` roda automaticamente antes de `serve` e `build`, copiando `documentos/Estatuto.pdf` para `public/`.

## Build e deploy

Deploy a partir da **raiz do monorepo**:

```bash
cd website && yarn build
cd .. && firebase deploy
```

## Estrutura principal

```
website/
├── src/
│   ├── components/     # NavBar, Aside, CardAbout, etc.
│   ├── views/pages/    # Home, Projects, Institutional, Contact, ...
│   ├── views/product-pages/
│   ├── plugins/i18n/   # Traduções pt/en
│   └── router.js
├── functions/          # Cloud Function sendEmail (SendGrid)
├── public/
└── dist/               # Build de produção (Firebase hosting)
```

## Rotas

| Rota | Página | Observação |
|------|--------|------------|
| `/` | Home | |
| `/institutional` | Institucional | Missão, visão, valores, membros, estatuto |
| `/projects` | Projetos | Cards com CTAs; vários "Saiba Mais" → `/comingsoon` |
| `/partners` | Parceiros | |
| `/contact` | Contato | Formulário → Cloud Function |
| `/formulario` | Formulário genérico | Query `?tipo=` por projeto |
| `/products/private-classes` | Aulas particulares | |
| `/comingsoon` | Em construção | Placeholder para fluxos pendentes |
| `/login` | Login | Placeholder (sem backend) |

## Configuração

Variáveis Firebase no projeto (Hosting). SendGrid:

```bash
firebase functions:config:set sendgrid.apikey="SG...."
```

## Integração futura

O website deve integrar-se ao Maestro para fluxos como doação, associação e solicitações de serviço — ver `maestro/plan.md`.

## Limitações conhecidas

- Vue 2 EOL; upgrade para Vue 3 exige refatoração Vuetify + CLI.
- `node_modules/` e `dist/` não devem ser commitados.
- Navbar mobile pode precisar de revisão (issue #2).
