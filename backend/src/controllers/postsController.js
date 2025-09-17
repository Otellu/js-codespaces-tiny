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

const upvotePost = async (req,res) => {
  try {
    const postId = Number(req.params.id);
    if (Number.isNaN(postId)) {
      return res.status(400).json({ message: 'Invalid id' });
    }
    const post = await Post.findByPk(postId);
    if(post) {
      await run('UPDATE posts SET votes = votes + 1 where id = ?',[post]);
    }
    return res.status(post);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to get post' });
    
  }
}

const unvotePost = async (req,res) => {
  try {
    const postId = Number(req.params.id);
    if (Number.isNaN(postId)) {
      return res.status(400).json({ message: 'Invalid id' });
    }
    const post = await Post.findByPk(postId);
    if(post) {
      await run('UPDATE posts SET votes = CASE WHEN votes > 0 THEN votes - 1 ELSE 0 END where id = ?',[post]);
    }
    return res.status(post);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to get post' });
    
  }
}

module.exports = {
  listPosts,
  getPostById,
  unvotePost,
  upvotePost
};


