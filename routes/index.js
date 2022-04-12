const express = require('express');

const router = express.Router();

const auth = require('./auth');
const verif = require('./verif');
const postings = require('./postings');
const editPost = require('./editPost');
const getAkun = require('./getAkun');
const deletePost = require('./deletePost');
const enable = require('./enableComment');
const disable = require('./disableComment');
const comment = require('./comment');
const getPosting = require('./getPosting');
const likes = require('./likes')

router.use('/v1/auth', auth);
router.use('/v1', verif)
router.use('/v1', postings)
router.use('/v1', editPost)
router.use('/v1', getAkun)
router.use('/v1', deletePost)
router.use('/v1', enable)
router.use('/v1', disable)
router.use('/v1', comment)
router.use('/v1', getPosting)
router.use('/v1', likes)

module.exports = router;