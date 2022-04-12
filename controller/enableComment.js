const { Postings } = require('../models');

const enableComment = async (req, res) => {
  await Postings.update({
    status: 'enable',
  }, { where: { id: req.params.id } });

  user = await Postings.findOne({
    where: { id: req.params.id },
  });

  if (user === null) {
    const result = {
      error: 'error',
      message: 'ID tidak ditemukan',
    };

    return res.status(400).json(result);
  }

  const result = {
    status: 'Success',
    message: 'Berhasil enable comment',
  };

  return res.status(200).json(result);
};

module.exports = {
  enableComment,
};
