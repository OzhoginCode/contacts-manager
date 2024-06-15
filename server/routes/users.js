import express from 'express';

import requiredAuth from '../middlwares/index.js';
import encrypt from '../src/encrypt.js';
import {
  getUserById, getUserByLogin, createUser, updateUser, deleteUser,
} from '../src/dbQueries.js';

const usersRouter = express.Router();

const validate = async (login, password) => {
  const errors = {};
  if (!login) {
    errors.login = 'Логин не может пустым';
  }

  if (!password) {
    errors.password = 'Пароль не может быть пустым';
  }

  const alreadyExists = await getUserByLogin(login);
  if (alreadyExists) {
    errors.login = 'Этот логин уже занят';
  }
  return errors;
};

usersRouter.post('/', async (req, res) => {
  const { login, password } = req.body;

  const errors = await validate(login, password);
  if (Object.keys(errors).length) {
    res.status(422);
    res.send({ form: { login, password }, errors });
    return;
  }

  const user = await createUser(login, encrypt(password));
  req.session.userId = user.id;
  res.send({ login, id: user.id });
});

usersRouter.get('/current', async (req, res) => {
  const { userId } = req.session;

  if (!userId) {
    res.status(200).send({ isGuest: true });
    return;
  }

  const user = await getUserById(userId);
  if (!user) {
    req.session.destroy(() => {
      res.status(404).send('Пользователь не найден!');
    });
    return;
  }
  const userInfo = { id: user.id, login: user.login, isGuest: false };
  res.status(200).send(userInfo);
});

usersRouter.put('/current', requiredAuth, async (req, res) => {
  const { userId } = req.session;
  const newData = req.body;

  const user = await getUserById(userId);
  if (!user) {
    req.session.destroy(() => {
      res.status(404).send('Пользователь не найден!');
    });
    return;
  }

  const login = newData.login || user.login;
  const passwordDigest = newData.password
    ? encrypt(newData.password)
    : user.password_digest;

  const errors = await validate(login, passwordDigest);
  if (Object.keys(errors).length) {
    res.status(422);
    res.send({ form: { login, passwordDigest }, errors });
    return;
  }

  await updateUser(userId, login, passwordDigest);
  res.status(200).send({ id: userId, login });
});

usersRouter.delete('/current', requiredAuth, async (req, res) => {
  const { userId } = req.session;

  const user = await getUserById(userId);
  if (!user) {
    req.session.destroy(() => {
      res.status(404).send('Пользователь не найден!');
    });
    return;
  }

  await deleteUser(userId);

  req.session.destroy(() => {
    res.status(200).send('Аккаунт успешно удален!');
  });
});

export default usersRouter;
