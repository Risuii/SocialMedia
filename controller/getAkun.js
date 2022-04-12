const {
  Users, Postings, Comments, Likes,
} = require('../models');

const getAkun = async (req, res) => {
  try {
    await Users.findOne({
      where: { id: req.user.id },
      include: [
        {
          model: Postings,
          as: 'Postings',
        }, {
          model: Comments,
          as: 'Comments',
        }, {
          model: Likes,
          as: 'Likes',
        },

      ],
    })
      .then((data) => {
        user = {
          username: data.username,
          email: data.email,
          status: data.status,
          postingan: data.Postings,
          comment: data.Comments,
          like: data.Likes,
        };
      });

    const result = {
      status: 'Success',
      message: 'Berhasil mengambil data akun',
      user,
    };

    return res.status(200).json(result);
  } catch (err) {
    const result = {
      status: 'error',
      message: 'Terjadi error ketika get akun',
    };

    return res.status(400).json(result);
  }
};

module.exports = {
  getAkun,
};
