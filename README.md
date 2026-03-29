# Briefing to Tasks — Frontend

Interface web para transformar briefings de projetos em tarefas estruturadas. Cole o texto do briefing, clique em analisar e receba automaticamente: título, objetivo, público-alvo, entregáveis, checklist, informações faltantes e perguntas de alinhamento.

> O frontend consome a API do [briefing2task-back](../briefing2task-back).

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

Crie o arquivo `.env`:

```env
VITE_API_URL=http://localhost:3000
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
│   ├── InputBriefing/      # rota /
│   ├── EstruturaAnalisada/ # rota /estrutura-analisada
│   └── Acoes/              # rota /acoes
├── types/              # interfaces TypeScript
└── utils/              # funções de formatação de texto
```

## Rotas

| Rota | Descrição |
|---|---|
| `/` | Formulário de entrada do briefing |
| `/estrutura-analisada` | Resultado estruturado da análise |
| `/acoes` | Ações de exportação (copiar como task, Markdown, etc.) |

## Segurança em produção

- Configure `VITE_API_URL` com `https://` apontando para o backend em produção
- Nunca commite o arquivo `.env`
