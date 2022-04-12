const express = require('express');

const router = express.Router();

const restrict = require('../middlewares/restrict');


const deletePost = require('../controller/deletePost')

router.delete('/posting/delete/:id',restrict, deletePost.deletePost)


module.exports = router;