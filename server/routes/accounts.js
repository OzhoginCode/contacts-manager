import express from 'express';

import requiredAuth from '../middlwares/index.js';
import {
  getAccountsByUserId, addNewAccount, getUserAccountById, updateAccount, deleteAccount,
} from '../src/dbQueries.js';

const accountsRouter = express.Router();

const removeUserId = ({ user_id, ...account }) => account; // eslint-disable-line camelcase

accountsRouter.get('/', requiredAuth, async (req, res) => {
  const { userId } = req.session;

  const userAccounts = await getAccountsByUserId(userId);
  const accountsData = userAccounts.map(removeUserId);
  res.status(200).send(accountsData);
});

accountsRouter.post('/', requiredAuth, async (req, res) => {
  const { userId } = req.session;
  const { service, login, password } = req.body;

  const createdAccount = await addNewAccount(userId, service, login, password);
  const accountData = removeUserId(createdAccount);
  res.status(201).send(accountData);
});

accountsRouter.get('/:id', requiredAuth, async (req, res) => {
  const { userId } = req.session;
  const { id: acccountId } = req.params;

  const account = await getUserAccountById(userId, acccountId);

  if (!account) {
    res.status(404).send('Аккаунт не найден!');
    return;
  }

  const accountInfo = removeUserId(account);
  res.status(200).send(accountInfo);
});

accountsRouter.put('/:id', requiredAuth, async (req, res) => {
  const { userId } = req.session;
  const { id: acccountId } = req.params;
  const newData = req.body;

  const account = await getUserAccountById(userId, acccountId);

  if (!account) {
    res.status(404).send('Аккаунт не найден!');
    return;
  }

  const service = newData.service || account.service;
  const login = newData.login || account.login;
  const password = newData.password || account.password;

  await updateAccount(acccountId, service, login, password);

  res.status(200).send(`Аккаунт ${acccountId} обновлен`);
});

accountsRouter.delete('/:id', requiredAuth, async (req, res) => {
  const { userId } = req.session;
  const { id: accountId } = req.params;

  const account = await getUserAccountById(userId, accountId);

  if (!account) {
    res.status(404).send('Аккаунт не найден!');
    return;
  }

  await deleteAccount(accountId);

  res.status(200).send('Аккаунт успешно удален!');
});

export default accountsRouter;
