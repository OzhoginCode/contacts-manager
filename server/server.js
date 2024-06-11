/* eslint-disable no-console */
import Express from 'express';
import accountsRouter from './routes/accountsRouter.js';

export default () => {
  const app = new Express();

  app.use(Express.json());

  app.use('/accounts', accountsRouter);

  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.error(err.stack);
    res.status(500).end();
  });

  return app;
};
