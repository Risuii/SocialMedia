const express = require('express');

const router = express.Router();


const verif = require('../controller/verifikasi')

router.post('/verifikasi/:id/:token', verif.verif)


module.exports = router;