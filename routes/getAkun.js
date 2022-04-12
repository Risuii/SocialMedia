const express = require('express');

const router = express.Router();

const restrict = require('../middlewares/restrict');


const getAkun = require('../controller/getAkun')

router.get('/getAkun',restrict, getAkun.getAkun)


module.exports = router;