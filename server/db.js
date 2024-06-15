import pg from 'pg';

const { Client } = pg;

const client = new Client({
  user: 'admin',
  password: 'password',
  host: 'db',
  port: 5432,
  database: 'password-manager-db',
});

await client.connect();

const createTablesQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    login VARCHAR(50) NOT NULL,
    password_digest VARCHAR(255) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    service VARCHAR(50) NOT NULL,
    login VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
  );
`;

await client.query(createTablesQuery);

export default client;
