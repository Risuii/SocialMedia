const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
  };

  // const rahasia = 'rahasia';
  const rahasia = process.env.SECRET_KEY
  return jwt.sign(payload, rahasia);
};

module.exports = {
  generateToken,
};
