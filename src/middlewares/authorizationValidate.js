module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const HTTP_UNAUTHORIZED = 401;

  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }
  if (typeof token !== 'string' || token.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED).json({ message: 'Token inválido' });
  }

  next();
};
