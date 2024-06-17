import express from 'express';

import {
  getAccountsByUserId, addNewAccount, getUserAccountById, updateAccount, deleteAccount,
} from '../src/dbQueries.js';

const accountsRouter = express.Router();

const removeUserId = ({ user_id, ...account }) => account; // eslint-disable-line camelcase

accountsRouter.get('/', async (req, res) => {
  const { userId } = req.session;

  const userAccounts = await getAccountsByUserId(userId);
  const accountsData = userAccounts.map(removeUserId);
  res.send(accountsData);
});

accountsRouter.post('/', async (req, res) => {
  const { userId } = req.session;
  const { service, login, password } = req.body;

  const createdAccount = await addNewAccount(userId, { service, login, password });
  const accountData = removeUserId(createdAccount);
  res.status(201).send(accountData);
});

accountsRouter.get('/:id', async (req, res) => {
  const { userId } = req.session;
  const { id: accountId } = req.params;

  const account = await getUserAccountById(userId, accountId);

  if (!account) {
    res.status(404).send({ error: 'Account not found' });
    return;
  }

  const accountData = removeUserId(account);
  res.send(accountData);
});

accountsRouter.put('/:id', async (req, res) => {
  const { userId } = req.session;
  const { id: accountId } = req.params;
  const newData = req.body;

  const account = await getUserAccountById(userId, accountId);

  if (!account) {
    res.status(404).send({ error: 'Account not found' });
    return;
  }

  const newAccountData = {
    service: newData.service || account.service,
    login: newData.login || account.login,
    password: newData.password || account.password,
  };

  await updateAccount(accountId, newAccountData);

  res.send(newAccountData);
});

accountsRouter.delete('/:id', async (req, res) => {
  const { userId } = req.session;
  const { id: accountId } = req.params;

  const account = await getUserAccountById(userId, accountId);

  if (!account) {
    res.status(404).send({ error: 'Account not found' });
    return;
  }

  await deleteAccount(accountId);

  res.status(204).send();
});

export default accountsRouter;
