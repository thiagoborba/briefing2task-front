# Briefing to Tasks — Frontend

Interface web para transformar briefings de projetos em tarefas estruturadas. Cole o texto do briefing, clique em analisar e receba automaticamente: título, objetivo, público-alvo, entregáveis, checklist, informações faltantes e perguntas de alinhamento.

> O frontend consome a API do [briefing2task-back](https://github.com/thiagoborba/briefing2task-back) — produção em `https://briefing2task-back.vercel.app`.

## Tecnologias

| | |
|---|---|
| Framework | React 19 + Vite |
| Linguagem | TypeScript |
| Roteamento | React Router v7 |
| HTTP Client | Axios |
| Estilização | CSS Modules |

## Pré-requisitos

- Node.js >= 18
- Backend rodando (ver `briefing2task-back`)

## Como rodar localmente

```bash
npm install
```

Em dev, o arquivo `.env.development` já está configurado com `http://localhost:3000`. Para outros ambientes, crie um `.env`:

```env
VITE_API_URL=https://briefing2task-back.vercel.app
```

Inicie:

```bash
npm run dev
```

Acesse `http://localhost:5173`.

## Como fazer build

```bash
npm run build   # gera os arquivos em dist/
npm run preview # serve o build localmente para validar
```

Os arquivos de `dist/` podem ser hospedados em qualquer CDN estática (Vercel, Netlify, etc.).

## Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `VITE_API_URL` | Não | URL base do backend (padrão: `http://localhost:3000`) |

## Estrutura do projeto

```
src/
├── api/                # cliente axios
├── components/         # componentes reutilizáveis
│   ├── ActionCard/
│   ├── Button/
│   ├── CardGrid/
│   ├── InfoCard/
│   ├── PageHeader/
│   ├── PageLayout/
│   └── TextareaField/
├── pages/
│   ├── Home/               # rota /
│   ├── InputBriefing/      # rota /briefing
│   ├── EstruturaAnalisada/ # rota /estrutura-analisada
│   ├── Acoes/              # rota /acoes
│   └── NotFound/           # rota * (404)
├── types/              # interfaces TypeScript
└── utils/              # funções de formatação de texto
```

## Rotas

| Rota | Descrição |
|---|---|
| `/` | Landing page — apresentação da ferramenta com logo e botão para começar |
| `/briefing` | Formulário de entrada do briefing |
| `/estrutura-analisada` | Resultado estruturado da análise |
| `/acoes` | Ações de exportação (copiar como task, Markdown, etc.) |
| `*` | Página 404 — rota não encontrada |

## Segurança em produção

- Configure `VITE_API_URL` com `https://` apontando para o backend em produção
- Nunca commite o arquivo `.env`

## SEO e indexação

| Arquivo / Tag | Para quê |
|---|---|
| Open Graph (`og:`) | Preview bonito no Facebook, LinkedIn e WhatsApp |
| Twitter Card | Preview bonito no Twitter/X |
| `public/sitemap.xml` | Diz ao Google quais páginas existem |
| `public/robots.txt` | Diz ao Google o que pode ou não indexar |
