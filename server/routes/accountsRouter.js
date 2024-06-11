import express from 'express';

const accountsRouter = express.Router();

let accounts = [];
let id = 0;

const getNewId = () => {
  id += 1;
  return id;
};

accountsRouter.get('/', async (req, res) => {
  try {
    res.status(200).send(`${JSON.stringify(accounts, null, 2)}`);
  } catch (e) {
    res.status(503).send(`Ошибка базы данных: ${e}`);
  }
});

accountsRouter.post('/', async (req, res) => {
  try {
    const id = getNewId();
    const newAccount = {
      id,
      login: req.body.login,
      password: req.body.password
    };
    accounts.push(newAccount);
    res.status(201).send(`${JSON.stringify(newAccount, null, 2)}`);
  } catch (e) {
    res.status(400).send(`Ошибка добавления аккаунта: ${e}`);
  }
});

accountsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const account = accounts.find((account) => account.id === parseInt(id));
  const accountInfo = JSON.stringify(account, null, 2);

  if (account) {
    res.status(200).send(`${accountInfo}`);
  } else {
    res.status(404).send('Аккаунт не найден!');
  }
});

accountsRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    const index = accounts.findIndex((account) => account.id === parseInt(id));

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

accountsRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const account = accounts.find((account) => account.id === parseInt(id));

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
