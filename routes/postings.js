const express = require('express');

const router = express.Router();

const restrict = require('../middlewares/restrict');


const postings = require('../controller/posting')

router.post('/posting',restrict, postings.postingans)


module.exports = router;