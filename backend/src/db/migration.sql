-- migration.sql
-- Script DDL manual (alternativa ao node-pg-migrate).
-- Fluxo: PostgreSQL <- repositories <- services <- controllers <- routes <- React

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cache local dos livros vindos da API externa (Google Books)
CREATE TABLE IF NOT EXISTS livros (
    id VARCHAR(50) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autores TEXT,
    descricao TEXT,
    url_capa VARCHAR(512),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS avaliacao (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    livro_id VARCHAR(50) NOT NULL,
    usuario_id UUID NOT NULL,
    nota SMALLINT NOT NULL CHECK (nota >= 1 AND nota <= 5),
    comentario TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_livro
        FOREIGN KEY (livro_id) REFERENCES livros(id) ON DELETE CASCADE,
    CONSTRAINT uk_usuario_livro UNIQUE (usuario_id, livro_id)
);
