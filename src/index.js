const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;
const PORT = '3000';

const getTalkers = async () => {
  const data = await fs.promises.readFile(path.resolve(__dirname, './talker.json'));
  const json = JSON.parse(data);
  return json;
};

const getById = async (id) => {
  const data = await getTalkers();
  return data.find((e) => e.id === id);
};

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

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
