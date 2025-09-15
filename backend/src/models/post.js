const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    votes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);


