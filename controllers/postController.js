const Post = require('../models/Post');

const getPosts = async (req, res) => {
  const posts = await Post.find({ user: req.user._id })
    .populate({
      path: 'comments',
      populate: {
        path: 'replies',
        model: 'Comment',
      },
    })
    .populate({
      path: 'user',
    });
  res.json(posts);
};

const createPost = async (req, res) => {
  const { title, description, isActive } = req.body;

  const data = new Post({
    title,
    description,
    isActive,
    user: req.user._id,
  });

  const post = await data.save();
  res.status(201).json({ post });
};

module.exports = { getPosts, createPost };
