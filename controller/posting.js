const { Postings } = require('../models');

const postingans = async (req, res) => {
  const { postingan } = req.body;
  const { email, username } = req.user;
  try {
    user = await Postings.create({
      user_id: req.user.id,
      postingan,
      status: 'enable',
      email,
      username,
    });

    const result = {
      status: 'Success',
      message: 'Berhasil membuat postingan',
      postinganID: user.id
    };

    return res.status(200).json(result);
  } catch (err) {
    const result = {
      status: 'error',
      message: 'Error ketika ingin memposting',
    };
    return res.status(400).json(result);
  }
};

module.exports = {
  postingans,
};
