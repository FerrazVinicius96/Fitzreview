CREATE TABLE IF NOT EXISTS usuarios (
    id        SERIAL PRIMARY KEY,
    nome      VARCHAR(100)  NOT NULL,
    email     VARCHAR(255)  NOT NULL UNIQUE,
    criado_em TIMESTAMP     DEFAULT NOW()
);
