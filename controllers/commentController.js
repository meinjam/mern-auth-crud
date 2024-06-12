const Post = require('../models/Post');
const Comment = require('../models/Comment');

const addComment = async (req, res) => {
  const { postId, text } = req.body;

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const comment = new Comment({
    text,
    user: req.user._id,
    post: postId,
  });

  const createdComment = await comment.save();

  post.comments.push(createdComment._id);
  await post.save();

  res.status(201).json(createdComment);
};

const addReply = async (req, res) => {
  const { commentId, text } = req.body;

  const comment = await Comment.findById(commentId);

  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  const reply = new Comment({
    text,
    user: req.user._id,
    post: comment.post,
  });

  const createdReply = await reply.save();

  comment.replies.push(createdReply._id);
  await comment.save();

  res.status(201).json(createdReply);
};

module.exports = { addComment, addReply };
