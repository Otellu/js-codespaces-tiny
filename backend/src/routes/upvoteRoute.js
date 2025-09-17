const express = require("express");

const { upvotePost } = require("../controllers/upvoteController");
const { route } = require("./postsRoutes");

const router = express.Router();

router.patch("/upvote/:id", upvotePost);

module.exports = route;
