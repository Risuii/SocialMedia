const express = require('express');

const router = express.Router();

const restrict = require('../middlewares/restrict');


const getPosting = require('../controller/getPosting')

router.get('/get/posting/:id',restrict, getPosting.getPosting)


module.exports = router;