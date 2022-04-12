const db = require('../models');
const { Postings } = require('../models');

const disableComment = async (req, res) => {

  await Postings.update({
    status: 'disable',
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
    message: 'Berhasil disable comment',
  };

  return res.status(200).json(result);
};

module.exports = {
  disableComment,
};
