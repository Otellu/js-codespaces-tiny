const express = require('express');
const { listPosts, getPostById, upvotePost, unvotePost } = require('../controllers/postsController');

const router = express.Router();

router.get('/', listPosts);
router.get('/:id', getPostById);
router.post('/upvote/:id', upvotePost);

module.exports = router;


