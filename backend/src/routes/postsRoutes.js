const express = require('express');
const { listPosts, getPostById, upvotePostById } = require('../controllers/postsController');

const router = express.Router();

router.get('/', listPosts);
router.get('/:id', getPostById);
router.patch('/:id', upvotePostById);

module.exports = router;


