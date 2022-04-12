const { Postings } = require('../models');

const editPost = async (req, res) => {
  const { postingan } = req.body;
  let user = {};

  try {
    user = await Postings.findOne({
      where: { id: req.params.id },
    });
  } catch (err) {
    const result = {
      status: 'error',
      message: 'Error ketika mencari user untuk edit post',
    };
    return res.status(400).json(result);
  }

  user = await Postings.findOne({
    where: { id: req.params.id },
  });

  if (user === null) {
    const result = {
      error: 'error',
      message: 'ID postingan tidak ditemukan',
    };

    return res.status(400).json(result);
  }

  if (user.user_id !== req.user.id) {
    const result = {
      status: 'error',
      message: 'Tidak bisa mengedit karena kamu bukan pemilik postingan',
    };

    return res.status(400).json(result);
  }

  try {
    await Postings.update({
      postingan,
      status: 'enable',
    }, { where: { id: req.params.id } });
  } catch (err) {
    const result = {
      status: 'error',
      message: 'Terjadi error ketika mengedit postingan',
    };

    return res.status(400).json(result);
  }

  const result = {
    status: 'Successs',
    message: 'Berhasil edit postingan',
  };

  return res.status(200).json(result);
};

module.exports = {
  editPost,
};
