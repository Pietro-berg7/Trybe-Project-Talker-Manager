const express = require('express');

const getById = require('./helpers/getById');
const newTalker = require('./helpers/newTalker');
const getTalkers = require('./helpers/getTalkers');
const emailValidate = require('./middlewares/emailValidate');
const tokenGenerator = require('./authentication/tokenGenerator');
const passwordValidate = require('./middlewares/passwordValidate');
const authorizationValidate = require('./middlewares/authorizationValidate');
const nameValidate = require('./middlewares/nameValidate');
const ageValidate = require('./middlewares/ageValidate');
const talkValidate = require('./middlewares/talkValidate');
const WatchedAtValidate = require('./middlewares/watchedAtValidate');
const rateValidate = require('./middlewares/rateValidate');
const editTalker = require('./middlewares/editTalker');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;
const PORT = '3000';

// endpoint GET /talker
app.get('/talker', async (_req, res) => {
  const talkers = await getTalkers(); 

  if (talkers) {
    res.status(HTTP_OK_STATUS).json(talkers);
  } else {
    res.status(HTTP_OK_STATUS).json([]);
  }
});

// endpoint GET /talker/:id
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getById(Number(id));
  
  const message = 'Pessoa palestrante não encontrada';

  if (talker) {
    res.status(HTTP_OK_STATUS).json(talker);
  } else {
    res.status(HTTP_NOT_FOUND).json({ message });
  }
});

// endpoint POST /login
app.post('/login', emailValidate, passwordValidate, (_req, res) => {
  const token = tokenGenerator();
  return res.status(HTTP_OK_STATUS).json({ token });
});

// endpoint POST /talker
app.post('/talker',
  authorizationValidate, 
  nameValidate,
  ageValidate,
  talkValidate,
  WatchedAtValidate,
  rateValidate,
  async (req, res) => {
    const getNewTalker = req.body;
    const addTalker = await newTalker(getNewTalker);
    return res.status(201).json(addTalker);
  });

// endpoint PUT /talker/:id
app.put('/talker/:id',
  authorizationValidate, 
  nameValidate,
  ageValidate,
  talkValidate,
  WatchedAtValidate,
  rateValidate,
  async (req, res) => {
    const { id } = req.params;
    const target = req.body;
    const edited = await editTalker(Number(id), target);
    return res.json(edited);
  });

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
