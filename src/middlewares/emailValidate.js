const { isEmail } = require('validator');

module.exports = (req, res, next) => {
  const { email } = req.body;
  const HTTP_BAD_REQUEST = 400;

  if (!email) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!isEmail(email)) {
    return res.status(HTTP_BAD_REQUEST).json(
      {
        message: 'O "email" deve ter o formato "email@email.com"',
      },
    );
  }

  next();
};
