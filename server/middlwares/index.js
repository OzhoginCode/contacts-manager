import { getUserById } from '../src/dbQueries.js';

const requiredAuth = (req, res, next) => {
  const { userId } = req.session;

  if (!userId) {
    res.status(401).send();
    next(new Error('Access denied'));
    return;
  }
  next();
};

const validateSession = async (req, res, next) => {
  const { userId } = req.session;

  if (!userId) {
    next();
    return;
  }

  const user = await getUserById(userId);
  if (!user) {
    req.session.destroy(() => {
      res.status(404).send({ error: 'User not found' });
    });
    next(new Error('User not found'));
    return;
  }
  req.user = user;
  next();
};

export { requiredAuth, validateSession };
