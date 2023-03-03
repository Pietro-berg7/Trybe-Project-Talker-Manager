const fs = require('fs');
const path = require('path');
const getTalkers = require('./getTalkers');

module.exports = async (talker) => {
  const oldTalkers = await getTalkers();
  const newId = { id: oldTalkers.length + 1, ...talker };
  const newTalkers = JSON.stringify([...oldTalkers, newId]);

  fs.writeFile(path.resolve(__dirname, '../talker.json'), newTalkers);

  return newId;
};