import { Post } from "../models";

export const upvotePost = async (req, res) => {

  try {
    const upvote = await Post.update({
      id: req.query.id,
      upvote: req.body.upvote
    });

    res.json(upvote);
  } catch (err) {
    res.status(500).json({ message: "Failed to upvote" });
  }
};
