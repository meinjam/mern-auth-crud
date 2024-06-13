const { default: mongoose } = require('mongoose');
const Post = require('../models/Post');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const getPosts = async (req, res) => {
  try {
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

    res.status(200).json(successResponse(200, 'Post retrieved successfully.', posts));
  } catch (error) {
    res.status(500).json(errorResponse(500, 'Internal server error', error.errors));
  }
};

const createPost = async (req, res) => {
  const { title, description, isActive } = req.body;

  try {
    const data = new Post({
      title,
      description,
      isActive,
      user: req.user._id,
    });

    const post = await data.save();
    const populatedPost = await Post.findById(post._id).populate('user', 'name email');
    res.status(201).json(successResponse(201, 'Post created successfully.', populatedPost));
  } catch (error) {
    res.status(400).json(errorResponse(400, 'Failed to create post', error.errors));
  }
};

const getSinglePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json(errorResponse(404, 'Post not found'));
    }

    const populatedPost = await Post.findById(post._id)
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

    res.status(200).json(successResponse(200, 'Post retrieved successfully', populatedPost));
  } catch (error) {
    res.status(500).json(errorResponse(500, 'Internal server error', error.errors));
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!post) {
      return res.status(404).json(errorResponse(404, 'Post not found'));
    }

    const populatedPost = await Post.findById(post._id)
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

    res.status(201).json(successResponse(201, 'Post updated successfully', populatedPost));
  } catch (error) {
    res.status(400).json(errorResponse(400, 'Failed to update post', error.errors));
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findOneAndDelete({ _id: id });
    if (!post) {
      return res.status(404).json(errorResponse(404, 'Post not found'));
    }

    res.status(200).json(successResponse(200, 'Post deleted successfully'));
  } catch (error) {
    res.status(500).json(errorResponse(500, 'Internal server error', error.errors));
  }
};

module.exports = { getPosts, createPost, getSinglePost, updatePost, deletePost };
