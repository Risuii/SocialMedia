/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
const nodemailer = require('nodemailer');
const { Postings, Likes } = require('../models');

const likes = async (req, res) => {
  const { email } = req.user;
  let user = {};

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
  
  try {
    user = await Postings.findOne({
      where: { id: req.params.id },
    })
      .then((data) => {
        Likes.create({
          user_id: req.user.id,
          posting_id: data.id,
          email,
          like: +1,
        });
      });
  } catch (err) {
    const result = {
      status: 'error',
      message: 'Error ketika memasukan like',
    };

    return res.status(400).json(result);
  }

  user = await Postings.findOne({});

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'renaris97@gmail.com',
      pass: 'baBehlo123?',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  user = await Postings.findOne({
      where: { user_id: req.params.id }
  });

  const data = await Postings.findOne({})

  const mailOptions = {
    from: 'Sosmed <renaris97@gmail.com>',
    to: data.email,
    subject: 'Notifikasi',
    text: `${req.user.username} telah memberikan like di postinganmu ${user.username}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('email sudah di kirim');
    }
  });

  const emails = await Likes.findAll({
    raw: true,
    nest: true,
  }, { where: { posting_id: req.params.id } });

  for (i = 0; i < emails.length; i++) {
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

    user = await Postings.findOne({});

    const mailOptions = {
      from: 'Sosmed',
      to: emails[i].email,
      subject: 'Notifikasi',
      text: `${req.user.username} telah memberikan like di postingan ${user.username}`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('email sudah di kirim');
      }
    });
  }

  const result = {
    status: 'Success',
    message: 'Berhasil memberikan like',
  };

  return res.status(200).json(result);
};

module.exports = {
  likes,
};
