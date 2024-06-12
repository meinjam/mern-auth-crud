const Post = require('../models/Post');

const getPosts = async (req, res) => {
  const posts = await Post.find({ user: req.user._id });
  res.json(posts);
};

const createPost = async (req, res) => {
  const { title, description, isActive } = req.body;

  const post = new Post({
    title,
    description,
    isActive,
    user: req.user._id,
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
};

module.exports = { getPosts, createPost };
