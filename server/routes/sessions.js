import express from 'express';

import { getUserByLogin } from '../src/dbQueries.js';
import encrypt from '../src/encrypt.js';

const sessionsRouter = express.Router();

sessionsRouter.post('/', async (req, res) => {
  const { login = '', password = '' } = req.body;
  const user = await getUserByLogin(login);
  if (!user || (user.password_digest !== encrypt(password))) {
    res.status(422);
    res.send({ form: { login, password }, error: 'Invalid login or password' });
    return;
  }

  req.session.userId = user.id;
  res.send({ id: user.id, login });
});

sessionsRouter.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.status(204).send();
  });
});

export default sessionsRouter;
