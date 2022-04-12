const { Postings, Comments, Likes } = require('../models');

const deletePost = async (req, res) => {
  let user = {};
  try {
    user = await Postings.findOne({});
  } catch (err) {
    const result = {
      status: 'error',
      message: 'Error ketika mencari user untuk postingan',
    };

    return res.status(400).json(result);
  }

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

  if (user.user_id !== req.user.id) {
    const result = {
      status: 'error',
      message: 'Tidak bisa menghapus karena kamu bukan pemilik postingan',
    };

    return res.status(400).json(result);
  }

  try {
    await Likes.destroy({
      where: { posting_id: req.params.id },
    })
      .then(() => {
        Comments.destroy({
          where: { posting_id: req.params.id },
        })
          .then(() => {
            Postings.destroy({
              where: { id: req.params.id },
            });
          });
      });
  } catch (err) {
    const result = {
      status: 'error',
      message: 'Terjadi error ketika delete post',
    };

    return res.status(400).json(result);
  }

  const result = {
    status: 'Success',
    message: 'Berhasil menghapus postingan',
  };

  return res.status(200).json(result);
};

module.exports = {
  deletePost,
};
