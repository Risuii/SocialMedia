const express = require('express');

const router = express.Router();

const restrict = require('../middlewares/restrict');


const enable = require('../controller/enableComment')

router.post('/enable/posting/:id',restrict, enable.enableComment)


module.exports = router;