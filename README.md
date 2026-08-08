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

## Fluxo de dados

1. React chama a API via axios (`frontend/src/api/client.js`).
2. Express recebe na rota e delega ao controller.
3. Service aplica regras (e consulta Google Books quando necessário).
4. Repository executa SQL no PostgreSQL com o `pool` compartilhado.
5. A resposta volta em JSON para a interface.
