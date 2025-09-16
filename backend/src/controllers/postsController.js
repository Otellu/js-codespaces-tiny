// Import Post model
const { Post } = require('../models');

const listPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to list posts' });
  }
};

const getPostById = async (req, res) => {
  try {
    const postId = Number(req.params.id);
    if (Number.isNaN(postId)) {
      return res.status(400).json({ message: 'Invalid id' });
    }
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    return res.json(post);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to get post' });
  }
};

const upvotePost = async (req, res) => {
  try {
    console.log("res::", req);
    const postId = req.id;
    const {username} = req.body;
    const post = await Post.findByPk(postId);
    const updateData = {
      username: username,
      vote: post.vote+1,
    }
    await Post.update(updateData);
    res.status(200).json({message: "Upvoted"})
  } catch (err) {
    return res.status(500).json({ message: 'Failed to upvote' });
  }
}



module.exports = {
  listPosts,
  getPostById,
  upvotePost
};


