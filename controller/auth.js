const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { lowerUser, lowerEmail } = require('../lib/lowerCase');
const { generateToken } = require('../lib/generateToken');
const { checkPW } = require('../lib/checkPW');
const { encrypt } = require('../lib/hashing');
const { validEmail } = require('../lib/regexEmail');
const { Users } = require('../models');

const register = async (req, res) => {
  const {
    username, password, email,
  } = req.body;

  const lowerCUS = lowerUser(username);
  const lowerCEM = lowerEmail(email);
  const encryptedPassword = encrypt(password);
  const checkEmail = validEmail(req.body.email);
  try {
    if (req.body.username === '') {
      const result = {
        status: 'error',
        message: 'Username Tidak Bole Kosong',
      };
      return res.status(400).json(result);
    }
    if (req.body.password === '') {
      const result = {
        status: 'error',
        message: 'Password Tidak Boleh Kosong',
      };
      return res.status(400).json(result);
    }
    if (req.body.email === '') {
      const result = {
        status: 'error',
        message: 'Email Tidak Boleh Kosong atau format email salah',
      };
      return res.status(400).json(result);
    }
    if (checkEmail === false) {
      const result = {
        status: 'error',
        message: 'Format Email salah',
      };
      return res.status(400).json(result);
    }
  } catch (err) {
    const result = {
      status: 'error',
      message: 'Error ketika cek nil register',
    };

    return res.status(400).json(result).json(err);
  }

  try {
    const user = await Users.findOne({
      where: { username: lowerCUS },
    });
    if (user) {
      const result = {
        status: 'error',
        message: 'Username yang didaftarkan sudah ada',
      };
      return res.status(400).json(result);
    }
  } catch (err) {
    const result = {
      status: 'error',
      message: 'Error ketika cari username yang sama',
    };

    return res.status(400).json(result).json(err);
  }

  try {
    const user = await Users.findOne({
      where: { email: lowerCEM },
    });
    if (user) {
      const result = {
        status: 'error',
        message: 'Email yang didaftarkan sudah ada',
      };
      return res.status(400).json(result);
    }
  } catch (err) {
    const result = {
      status: 'error',
      message: 'Error ketika cari email yang sama',
    };

    return res.status(400).json(result).json(err);
  }

  const user = await Users.create({
    username,
    password: encryptedPassword,
    email,
    status: 'disable',
    Comments: {
      status: 'disable',
      email,
    },
    Postings: {
      status: 'disable',
      email,
    },
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

  const JWT_SECRET = process.env.SECRET_KEY;

  const secret = JWT_SECRET;
  const payload = {
    email,
  };

  const token = jwt.sign(payload, secret, { expiresIn: '15m' });
  const link = `http://localhost:3000/v1/verifikasi/${user.id}/${token}`;

  const mailOptions = {
    from: 'Sosmed <renaris97@gmail.com>',
    to: email,
    subject: 'Link Verifikasi Akun',
    text: `Berikut ini adalah link untuk verifikasi akun kamu: ${link} `,
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
    message: 'Berhasil Registerasi',

    Username: user.username,
    Email: user.email,
    StatusAkun: user.status,
  };
  return res.status(200).json(result);
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const lowerCUS = lowerUser(username);
  let user = {};
  try {
    user = await Users.findOne({
      where: { username: lowerCUS },
    });
  } catch (err) {
    const result = {
      status: 'error',
      message: 'Error ketika mencari user di login',
    };
    return res.status(400).json(result).json(err);
  }
  if (!user) {
    const result = {
      status: 'error',
      message: 'Akun tidak ditemukan, silahkan daftar',
    };
    return res.status(400).json(result);
  }
  try {
    if (req.body.username === '') {
      const result = {
        status: 'error',
        message: 'Username tidak boleh kosong',
      };
      return res.status(400).json(result);
    }
    if (req.body.password === '') {
      const result = {
        status: 'error',
        message: 'Password tidak boleh kosong',
      };
      return res.status(400).json(result);
    }
  } catch (err) {
    const result = {
      status: 'error',
      message: 'Error ketika check nil di login',
    };
    return res.status(400).json(result).json(err);
  }

  try {
    const isPasswordValid = checkPW(password, user.password);
    if (!isPasswordValid) {
      const result = {
        status: 'error',
        message: 'Password salah',
      };
      return res.status(400).json(result);
    }
  } catch (err) {
    const result = {
      status: 'error',
      message: 'Error ketika check password di login',
    };
    return res.status(400).json(result).json(err);
  }
  if (user.status === 'disable') {
    const result = {
      status: 'error',
      message: 'Akun belum di verifikasi, silahkan check email',
    };
    return res.status(400).json(result);
  }

  const data = {
    username: `Hallo ${username}`,
  };

  const result = {
    status: 'Success',
    message: 'Berhasil Login',
    Token: generateToken(user),
    data,
  };

  return res.status(200).json(result);
};

module.exports = {
  register,
  login,
};
