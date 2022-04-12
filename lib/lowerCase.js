const lc = require('lower-case');

const lowerUser = (username) => lc.lowerCase(username);
const lowerEmail = (email) => lc.lowerCase(email);

module.exports = {
  lowerUser,
  lowerEmail,
};
