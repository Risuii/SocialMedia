const express = require('express');

const router = express.Router();

const restrict = require('../middlewares/restrict');


const likes = require('../controller/likes')

router.post('/likes/:id',restrict, likes.likes)


module.exports = router;