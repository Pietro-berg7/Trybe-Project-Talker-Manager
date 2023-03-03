const tokenGenerator = () => {
  let token = '';
  const allChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 16; i + 1) {
    token += allChar.charAt(Math.floor(Math.random() * allChar.length));
  }

  return token;
};

module.exports = { tokenGenerator };