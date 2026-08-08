/**
 * A tabela `livros` foi criada inicialmente só com id/titulo/url_capa.
 * O código atual espera também autores/descricao — esta migration alinha o banco.
 *
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
	pgm.sql(`
        ALTER TABLE livros
            ADD COLUMN IF NOT EXISTS autores TEXT,
            ADD COLUMN IF NOT EXISTS descricao TEXT,
            ADD COLUMN IF NOT EXISTS criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

        ALTER TABLE livros
            ALTER COLUMN url_capa TYPE VARCHAR(512);
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.down = (pgm) => {
	pgm.sql(`
        ALTER TABLE livros
            DROP COLUMN IF EXISTS autores,
            DROP COLUMN IF EXISTS descricao,
            DROP COLUMN IF EXISTS criado_em;
    `);
};
