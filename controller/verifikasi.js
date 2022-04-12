const { Users } = require('../models');

const verif = async (req, res) => {
  await Users.update({
    status: 'enable',
  }, { where: { id: req.params.id } });

  const result = {
    status: 'success',
    message: 'Berhasil verifikasi akun',
  };

  return res.status(200).json(result);
};

module.exports = {
  verif,
};
