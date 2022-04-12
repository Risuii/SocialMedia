const nodemailer = require('nodemailer');
const { Postings, Comments } = require('../models');

const comments = async (req, res) => {
  const { comment } = req.body;
  const { status, email } = req.user;
  let user = {};
  let data = {};

  try {
    user = Postings.findOne({
      where: { id: req.params.id },
    });
  } catch (err) {
    const result = {
      status: 'error',
      message: 'Error ketika mencari status postingan',
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

  if (user.status === 'disable') {
    const result = {
      status: 'error',
      message: 'Comment di disable',
    };

    return res.status(400).json(result);
  }

  try {
    user = await Comments.findOne({
      where: { status },
    });
  } catch (err) {
    const result = {
      status: 'error',
      message: 'Error ketika mencari status di comments',
    };

    return res.status(400).json(result);
  }

  if (req.user.status === 'disable') {
    const result = {
      status: 'error',
      message: 'Kolom comment di disable',
    };
    return res.status(400).json(result);
  }

  try {
    data = await Postings.findOne({
      where: { id: req.params.id },
    })
      .then((datas) => {
        Comments.create({
          user_id: req.user.id,
          posting_id: datas.id,
          comment,
          email,
          status: 'enable',
        });
      });
  } catch (err) {
    const result = {
      status: 'error',
      message: 'Error ketika memberikan comment',
    };

    return res.status(400).json(result);
  }

  data = await Postings.findOne({
    where: { id: req.params.id },
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'renaris97@gmail.com',
      pass: 'babehlo123',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: 'Sosmed <renaris97@gmail.com>',
    to: data.email,
    subject: 'Notifikasi',
    text: `${req.user.username} telah comment di postinganmu`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('email sudah di kirim');
    }
  });

  const result = {
    status: 'Success',
    message: 'Berhasil membuat comment',
  };

  return res.status(200).json(result);
};

module.exports = {
  comments,
};
