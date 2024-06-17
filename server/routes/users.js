import express from 'express';

import { requiredAuth, validateSession } from '../middlwares/index.js';
import encrypt from '../src/encrypt.js';
import {
  getUserByLogin, createUser, updateUser, deleteUser,
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
  const { login = '', password = '' } = req.body;

  const errors = await validate(login, password);
  if (Object.keys(errors).length) {
    res.status(422);
    res.send({ form: { login, password }, errors });
    return;
  }

  const user = await createUser(login, encrypt(password));
  req.session.userId = user.id;
  res.status(201).send({ login, id: user.id });
});

usersRouter.get('/current', validateSession, async (req, res) => {
  const { userId } = req.session;

  if (!userId) {
    res.send({ isGuest: true });
    return;
  }

  const { user } = req;
  const userInfo = { id: user.id, login: user.login, isGuest: false };
  res.send(userInfo);
});

usersRouter.put('/current', requiredAuth, validateSession, async (req, res) => {
  const newData = req.body;
  const { user } = req;

  const login = newData.login || user.login;
  const passwordDigest = newData.password
    ? encrypt(newData.password)
    : user.password_digest;

  const errors = await validate(login, passwordDigest);
  if (Object.keys(errors).length) {
    res.status(422);
    res.send({ form: { login, password: newData.password }, errors });
    return;
  }

  await updateUser(user.id, login, passwordDigest);
  res.send({ id: user.id, login });
});

usersRouter.delete('/current', requiredAuth, validateSession, async (req, res) => {
  const { userId } = req.session;

  await deleteUser(userId);

  req.session.destroy(() => {
    res.status(204).send();
  });
});

export default usersRouter;
