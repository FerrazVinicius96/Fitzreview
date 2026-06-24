-- Extensão necessária no PostgreSQL para gerar UUIDs (caso ainda não esteja ativa)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- UUID: Mais seguro para APIs
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL, -- Essencial: Nunca guardamos a senha em texto puro!
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Nossa tabela de "Cache" para não termos que bater no Google o tempo todo
CREATE TABLE IF NOT EXISTS livros (
    id VARCHAR(50) PRIMARY KEY, -- O ID vem do Google Books (ex: "zyTCAlFPjgYC")
    titulo VARCHAR(255) NOT NULL,
    url_capa VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS avaliacao (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    livro_id VARCHAR(50) NOT NULL, -- Match com o tipo do ID do livro
    usuario_id UUID NOT NULL,      -- Match com o tipo do ID do usuário
    nota SMALLINT NOT NULL CHECK (nota >= 1 AND nota <= 5), -- Regra de negócio blindada no BD
    comentario TEXT NOT NULL,      -- Assumindo o seu critério de que deve ter texto
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Chaves Estrangeiras Nomeadas (facilita muito na hora de ler logs de erro)
    CONSTRAINT fk_usuario 
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_livro 
        FOREIGN KEY (livro_id) REFERENCES livros(id) ON DELETE CASCADE,
        
    -- Regra para evitar avaliações duplicadas
    CONSTRAINT uk_usuario_livro UNIQUE (usuario_id, livro_id)
);