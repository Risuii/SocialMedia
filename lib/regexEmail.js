function validEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

module.exports = {
  validEmail,
};
