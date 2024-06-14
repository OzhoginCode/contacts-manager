import express from 'express';

const accountsRouter = express.Router();

let accounts = [];
let id = 0;

const getNewId = () => {
  id += 1;
  return id;
};

const removeUserId = ({ userId, ...account }) => account;

const requiredAuth = (req, res, next) => {
  const { userId } = req.session;

  if (!userId) {
    res.status(403).send();
    return next(new Error('Access denied'));
  }
  next();
};

accountsRouter.get('/', requiredAuth, (req, res) => {
  const { userId } = req.session;

  const userAccounts = accounts
    .filter((account) => account.userId === userId)
    .map(removeUserId);

  try {
    res.status(200).send(`${JSON.stringify(userAccounts, null, 2)}`);
  } catch (e) {
    res.status(503).send(`Ошибка базы данных: ${e}`);
  }
});

accountsRouter.post('/', requiredAuth, (req, res) => {
  const { userId } = req.session;

  try {
    const id = getNewId();
    const newAccount = {
      id,
      userId,
      service: req.body.service,
      login: req.body.login,
      password: req.body.password
    };
    accounts.push(newAccount);
    const accountData = removeUserId(newAccount);
    res.status(201).send(`${JSON.stringify(accountData, null, 2)}`);
  } catch (e) {
    res.status(400).send(`Ошибка добавления аккаунта: ${e}`);
  }
});

accountsRouter.get('/:id', requiredAuth, (req, res) => {
  const { userId } = req.session;
  const { id } = req.params;

  const userAccounts = accounts.filter((account) => account.userId === userId);
  const account = userAccounts.find((account) => account.id === parseInt(id));
  
  if (account) {
    const accountInfo = JSON.stringify(removeUserId(account), null, 2);
    res.status(200).send(`${accountInfo}`);
  } else {
    res.status(404).send('Аккаунт не найден!');
  }
});

accountsRouter.put('/:id', requiredAuth, (req, res) => {
  const { userId } = req.session;

  try {
    const { id } = req.params;
    const newData = req.body;

    const userAccounts = accounts.filter((account) => account.userId === userId);
    const index = userAccounts.findIndex((account) => account.id === parseInt(id));

    if (index === -1) {
      res.status(404).send('Аккаунт не найден!');
      return;
    }

    accounts[index] = { ...accounts[index], ...newData };
    res.status(200).send(`Аккаунт ${id} обновлен`);
  } catch (error) {
    res.status(400).send(`Ошибка: ${error}`);
  }
});

accountsRouter.delete('/:id', requiredAuth, (req, res) => {
  const { userId } = req.session;

  try {
    const { id } = req.params;
    const userAccounts = accounts.filter((account) => account.userId === userId);
    const account = userAccounts.find((account) => account.id === parseInt(id));

    if (!account) {
      res.status(404).send('Аккаунт не найден!');
      return;
    }

    accounts = accounts.filter((account) => account.id !== parseInt(id));

    res.send('Аккаунт успешно удален!');
  } catch (error) {
    res.status(500).send(`Произошла ошибка при удалении аккаунта: ${error}`);
  }
});

export default accountsRouter;
