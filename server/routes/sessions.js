import express from 'express';

import encrypt from '../encrypt.js';
import { users } from './users.js';

const sessionsRouter = express.Router();

sessionsRouter.post('/', (req, res) => {
  const { login, password } = req.body;
  const user = users.find((u) => u.login === login);
  if (!user || (user.passwordDigest !== encrypt(password))) {
    res.status(422);
    res.send(JSON.stringify({ form: { login, password }, error: 'Invalid login or password' }));
    return;
  }

  req.session.userId = user.id;
  res.status(200).send();
});

sessionsRouter.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.status(200).send('Пользователь разлогинен');
  });
});

export default sessionsRouter;
