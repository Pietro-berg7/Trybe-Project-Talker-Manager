const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const getTalkers = async () => {
  const data = await fs.promises.readFile(path.resolve(__dirname, './talker.json'));
  const json = JSON.parse(data);
  return json;
};

app.get('/talker', async (_req, res) => {
  const talkers = await getTalkers(); 

  if (talkers) {
    res.status(HTTP_OK_STATUS).json(talkers);
  } else {
    res.status(HTTP_OK_STATUS).json([]);
  }
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
