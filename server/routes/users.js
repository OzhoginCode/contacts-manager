import express from 'express';

import encrypt from '../encrypt.js';

const usersRouter = express.Router();

let id = 0;

const getNewId = () => {
  id += 1;
  return id;
};

let users = [];

usersRouter.post('/', (req, res) => {
  const { login, password } = req.body;

  const errors = {};
  if (!login) {
    errors.login = "Логин не может пустым";
  }

  if (!password) {
    errors.password = "Пароль не может быть пустым";
  }

  if (users.filter((user) => user.login === login).length) {
    errors.login = 'Этот логин уже занят';
  }

  if (!Object.keys(errors).length) {
    const user = {
      id: getNewId(),
      login,
      passwordDigest: encrypt(password)
    };
    users.push(user);

    req.session.userId = user.id;
    res.end(JSON.stringify({ login, id }));
    return;
  }

  res.status(422);
  res.send(JSON.stringify({ form: { login, password }, errors }));
});

usersRouter.get('/current', (req, res) => {
  const { userId } = req.session;

  if (!userId) {
    res.status(200).send({ isGuest: true });
    return;
  }

  const user = users.find((user) => user.id === parseInt(userId));
  if (!user) {
    req.session.destroy(() => {
      res.status(404).send('Пользователь не найден!');
    });
    return;
  }
  const userInfo = JSON.stringify({ id: user.id, login: user.login, isGuest: false }, null, 2);
  res.status(200).send(`${userInfo}`);
});

usersRouter.put('/current', (req, res) => {
  const { userId } = req.session;
  const newData = req.body;

  if (!userId) {
    res.status(403).send();
    return;
  }

  const index = users.findIndex((user) => user.id === parseInt(userId));
  if (index === -1) {
    req.session.destroy(() => {
      res.status(404).send('Пользователь не найден!');
    });
    return;
  }
  const processedData = {
    login: newData.login || users[index].login,
    passwordDigest: encrypt(newData.password) || users[index].passwordDigest,
  };
  users[index] = { ...users[index], ...processedData };
  const user = users[index];
  const userInfo = JSON.stringify({ id: user.id, login: user.login, isGuest: false }, null, 2);
  res.status(200).send(`${userInfo}`);
  return;
});

usersRouter.delete('/current', (req, res) => {
  const { userId } = req.session;
  if (!userId) {
    res.status(403).send();
    return;
  }

  const user = users.find((user) => user.id === parseInt(id));

  if (!user) {
    req.session.destroy(() => {
      res.status(404).send('Пользователь не найден!');
    });
    return;
  }

  users = users.filter((user) => user.id !== parseInt(id));

  req.session.destroy(() => {
    res.status(200).send('Аккаунт успешно удален!');
  });
});

export { users };
export default usersRouter;
