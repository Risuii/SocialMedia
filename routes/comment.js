const express = require('express');

const router = express.Router();

const restrict = require('../middlewares/restrict');


const comment = require('../controller/comment')

router.post('/comment/:id',restrict, comment.comments)


module.exports = router;