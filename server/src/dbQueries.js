import client from '../db.js';

const getUserByLogin = async (login) => {
  const result = await client.query('SELECT * FROM users WHERE login = $1', [login]);
  const user = result.rows[0];
  return user;
};

const getUserById = async (userId) => {
  const result = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
  const user = result.rows[0];
  return user;
};

const createUser = async (login, passwordDigest) => {
  const result = await client.query(
    'INSERT INTO users (login, password_digest) VALUES ($1, $2) RETURNING *',
    [login, passwordDigest],
  );
  const user = result.rows[0];
  return user;
};

const updateUser = async (userId, login, passwordDigest) => {
  const result = await client.query('UPDATE users SET login = $1, password_digest = $2 WHERE id = $3', [
    login,
    passwordDigest,
    userId,
  ]);
  const updatedAccount = result.rows[0];
  return updatedAccount;
};

const deleteUser = async (id) => {
  await client.query('DELETE FROM users WHERE id = $1', [id]);
};

const getAccountsByUserId = async (userId) => {
  const result = await client.query('SELECT * FROM accounts WHERE user_id = $1', [userId]);
  const accounts = result.rows;
  return accounts;
};

const getUserAccountById = async (userId, accountId) => {
  const result = await client.query('SELECT * FROM accounts WHERE user_id = $1 AND id = $2', [userId, accountId]);
  const account = result.rows[0];
  return account;
};

const addNewAccount = async (userId, { service, login, password }) => {
  const result = await client.query(
    'INSERT INTO accounts (user_id, service, login, password) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, service, login, password],
  );
  const createdAccount = result.rows[0];
  return createdAccount;
};

const updateAccount = async (id, { service, login, password }) => {
  const result = await client.query(
    'UPDATE accounts SET service = $1, login = $2, password = $3 WHERE id = $4',
    [service, login, password, id],
  );
  const updatedAccount = result.rows[0];
  return updatedAccount;
};

const deleteAccount = async (id) => {
  await client.query('DELETE FROM accounts WHERE id = $1', [id]);
};

export {
  getUserByLogin,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getAccountsByUserId,
  getUserAccountById,
  addNewAccount,
  updateAccount,
  deleteAccount,
};
