const { Postings, Comments, Likes } = require('../models');

const getPosting = async (req, res) => {

  let user = await Postings.findOne({
    where: { id: req.params.id },
  });

  if (user === null) {
    const result = {
      error: 'error',
      message: 'ID tidak ditemukan',
    };

    return res.status(400).json(result);
  }

  try {
    await Postings.findOne({
      where: { id: req.params.id },
      include: [{
        model: Comments,
        as: 'Comments',
      }, {
        model: Likes,
        as: 'Likes',
      }],
    })
      .then((data) => {
        user = {
          id: data.id,
          postingan: data.postingan,
          comment: data.Comments,
          like: data.Likes,
        };
      });

    const result = {
      status: 'Success',
      message: 'Berhasil get postingan',
      user,
    };

    return res.status(200).json(result);
  } catch (err) {
    const result = {
      status: 'error',
      message: 'Error ketika get postingan',
    };

    return res.status(400).json(result);
  }
};

module.exports = {
  getPosting,
};
