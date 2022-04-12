const express = require('express');

const router = express.Router();

const restrict = require('../middlewares/restrict');


const editPost = require('../controller/editPost')

router.put('/posting/edit/:id',restrict, editPost.editPost)


module.exports = router;