const requiredAuth = (req, res, next) => {
  const { userId } = req.session;

  if (!userId) {
    res.status(403).send();
    next(new Error('Access denied'));
    return;
  }
  next();
};

export default requiredAuth;
