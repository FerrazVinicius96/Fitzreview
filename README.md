# FitzReview — Catálogo de Reviews de Livros

Projeto fullstack: **Backend** (Node.js / Express / PostgreSQL) + **Frontend** (React + TypeScript + Tailwind), com estética Japandi dark / industrial e detalhes em bronze.

## Estrutura

```
backend/     → Rotas → Controllers → Services → Repositories → PostgreSQL
frontend/    → Landing (GSAP + Framer Motion) + busca + detalhes/avaliações
```

## Pré-requisitos

- Node.js 18+
- PostgreSQL
- **API do Google Books** — obrigatória para o FitzReview funcionar. A busca e os detalhes dos livros dependem dessa API externa; sem ela, as telas de catálogo não operam.

### Como obter a chave (Google Books API)

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/).
2. Crie (ou selecione) um projeto.
3. Ative a **Books API** (Google Books API).
4. Em *Credenciais*, gere uma **API key**.
5. Coloque a chave no `.env` do backend como `GOOGLE_BOOKS_API_KEY`.

## Backend

```bash
cd backend
cp .env.example .env
# Preencha no .env:
#   DATABASE_URL=...
#   GOOGLE_BOOKS_API_KEY=sua_chave_aqui
# Criar o banco, depois:
psql -U postgres -d fitzreview -f src/db/migration.sql
# ou: npm run migrate:up
npm install
npm run dev            # http://localhost:3000
```

### Principais endpoints (`/api`)

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/livros/busca?q=` | Busca na API Google Books |
| GET | `/livros/:id` | Detalhe + cache no Postgres |
| GET/POST/PATCH/DELETE | `/avaliacoes`… | CRUD de reviews |
| POST/GET/PATCH | `/usuarios`… | Usuários |

## Frontend

```bash
cd frontend
cp .env.example .env   # opcional; proxy Vite usa /api
npm install
npm run dev            # http://localhost:5173
```

Rotas da interface:

| Caminho | Tela |
|---|---|
| `/` | Landing (Fase 02) — Hero + sticky scroll + tipografia progressiva |
| `/catalogo` | Busca de livros (Google Books) |
| `/livro/:id` | Detalhes e avaliações |

### Landing (Fase 02)

Animações pesadas ficam isoladas do JSX:

```
frontend/src/animations/          → GSAP (ScrollTrigger, cleanup)
frontend/src/components/landing/  → markup + Tailwind
frontend/src/pages/LandingPage.tsx
```

- **Hero:** `useHeroReveal` anima `y`, `scale` e `opacity` com scrub.
- **Meio:** coluna esquerda `sticky top-0`; cartões entram com Framer Motion `whileInView`.
- **Rodapé:** `useFooterTypeFill` revela o CTA da esquerda para a direita (`clip-path` + scrub).

Classes úteis do tema: `bg-obsidian`, `text-paper`, `text-mist`, `text-display`, `glow-bronze`, `landing-kicker`, `texture-grain`.

GSAP no React: sempre `gsap.context` + `ctx.revert()` no cleanup do `useLayoutEffect` (ver `src/animations/useGsapContext.ts`). Sem o `revert()`, o StrictMode duplica ScrollTriggers e vaza listeners de scroll.

## Fluxo de dados

1. React chama a API via axios (`frontend/src/api/client.js`).
2. Express recebe na rota e delega ao controller.
3. Service aplica regras (e consulta Google Books quando necessário).
4. Repository executa SQL no PostgreSQL com o `pool` compartilhado.
5. A resposta volta em JSON para a interface.
