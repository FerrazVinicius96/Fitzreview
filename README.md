# FitzReview — Catálogo de Reviews de Livros

Projeto fullstack: **Backend** (Node.js / Express / PostgreSQL) + **Frontend** (React + Tailwind), com estética Minimalista Industrial / Dark + Bronze.

## Estrutura

```
backend/     → Rotas → Controllers → Services → Repositories → PostgreSQL
frontend/    → React (busca de livros + detalhes/avaliações)
```

## Pré-requisitos

- Node.js 18+
- PostgreSQL

## Backend

```bash
cd backend
cp .env.example .env   # preencha DATABASE_URL (ou DB_*)
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

## Fluxo de dados

1. React chama a API via axios (`frontend/src/api/client.js`).
2. Express recebe na rota e delega ao controller.
3. Service aplica regras (e consulta Google Books quando necessário).
4. Repository executa SQL no PostgreSQL com o `pool` compartilhado.
5. A resposta volta em JSON para a interface.
