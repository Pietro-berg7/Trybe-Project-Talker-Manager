const fs = require('fs');
const path = require('path');
const getTalkers = require('../helpers/getTalkers');

module.exports = async (id, newObj) => {
  const talker = await getTalkers();
  const talkerId = talker.findIndex((obj) => obj.id === id);
  const alteredTalker = { ...talker[talkerId], ...newObj };
  talker.splice(talkerId, 1, alteredTalker);
  const allNewTalkers = JSON.stringify(talker);
  fs.writeFile(path.resolve(__dirname, '../talker.json'), allNewTalkers, () => {});
  return alteredTalker;
};