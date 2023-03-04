function rateBetween(rate) {
    return rate < 1 || rate > 5;
}

function notRate(rate) {
  return !rate;
}

function notInteger(rate) {
  return !Number.isInteger(rate);
}

function rateEmpty(rate) {
  return rate.toString().trim().length === 0;
}

module.exports = (req, res, next) => {
  const { rate } = req.body.talk;
  
  if (rateBetween(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (notRate(rate)) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (notInteger(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (rateEmpty(rate)) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  next();
};