# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (port 5173)
npm run build      # TypeScript compile + Vite build → dist/
npm run lint       # ESLint (flat config, TypeScript + React Hooks rules)
npm run preview    # Preview production build locally
```

No test runner is configured.

## Environment

`.env.development` is committed and sets `VITE_API_URL=http://localhost:3000` for local dev — no manual setup needed.

For other environments, create a `.env` file in the project root:

```
VITE_API_URL=https://briefing2task-back.vercel.app
```

`VITE_API_URL` defaults to `http://localhost:3000` if not set. The backend must be running separately.

## Architecture

Single-purpose React SPA that sends a briefing text to a backend API and displays the structured result.

**User flow:** `Home (/)` → `InputBriefing (/briefing)` → `EstruturaAnalisada (/estrutura-analisada)` → `Acoes (/acoes)`

**State between pages** is passed via React Router `location.state` — there is no global state manager. Each page accesses `useLocation().state` to read the previous page's data.

**API** (`src/api/index.ts`): single Axios instance, one endpoint — `POST /analyse-briefing` with `{ briefing: string }`. Response shape is `BriefingResult` defined in `src/types/`.

**Component/page structure**: every page and component lives in its own folder with `index.tsx` + a co-located `.module.css` file. CSS Modules are used throughout — no CSS-in-JS, no utility framework.

**Text export utilities** (`src/utils/index.ts`): `formatAsTask()`, `formatForPM()`, `formatAlignmentQuestions()` — these transform the `BriefingResult` into clipboard-ready text formats.

## TypeScript

Strict mode is on (`strict`, `noUnusedLocals`, `noUnusedParameters`, `noUncheckedSideEffectImports`). The project uses a composite config: `tsconfig.app.json` (src code, target ES2023) and `tsconfig.node.json` (vite config).
