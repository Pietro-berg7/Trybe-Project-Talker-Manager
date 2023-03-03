const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const data = await fs.promises.readFile(path.resolve(__dirname, '../talker.json'));
  const json = JSON.parse(data);
  return json;
};