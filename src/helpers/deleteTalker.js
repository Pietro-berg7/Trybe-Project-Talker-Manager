const fs = require('fs');
const path = require('path');
const getTalkers = require('./getTalkers');

module.exports = async (id) => {
  const talker = await getTalkers();
  const removeTalkers = talker.filter((obj) => obj.id !== id);
  fs.writeFile(path.resolve(__dirname, '../talker.json'), JSON.stringify(removeTalkers), () => {});
};