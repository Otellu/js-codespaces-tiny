// Import Post model
const { Post } = require("../models");

const listPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to list posts" });
  }
};

const getPostById = async (req, res) => {
  try {
    const postId = Number(req.params.id);
    if (Number.isNaN(postId)) {
      return res.status(400).json({ message: "Invalid id" });
    }
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.json(post);
  } catch (err) {
    return res.status(500).json({ message: "Failed to get post" });
  }
};

const upvotePostById = async (req, res) => {
  try {
    const postId = Number(req.params.id);
    const upvote = req.query.state === "upvote";
    if (Number.isNaN(postId)) {
      return res.status(400).json({ message: "Invalid id" });
    }
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.votes = (post.votes || 0) + 1;
    await post.save();
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: "Failed to get post" });
  }
};

module.exports = {
  listPosts,
  getPostById,
  upvotePostById,
};
