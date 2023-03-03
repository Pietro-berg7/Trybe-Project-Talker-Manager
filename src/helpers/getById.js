const getTalkers = require('./getTalkers');

module.exports = async (id) => {
  const data = await getTalkers();
  return data.find((e) => e.id === id);
};