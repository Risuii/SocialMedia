const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
  };

  const rahasia = 'rahasia';
  return jwt.sign(payload, rahasia);
};

module.exports = {
  generateToken,
};
