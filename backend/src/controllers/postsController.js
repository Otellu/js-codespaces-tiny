// Import Post model
const { Post } = require('../models');

const listPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to list posts' });
  }
};

const getPostById = async (req, res) => {
  return res.status(501).json({ todo: 'Implement GET /api/posts/:id' });
};



module.exports = {
  listPosts,
  getPostById,
};


