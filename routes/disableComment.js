const express = require('express');

const router = express.Router();

const restrict = require('../middlewares/restrict');


const disable = require('../controller/disableComment')

router.post('/disable/posting/:id',restrict, disable.disableComment)


module.exports = router;