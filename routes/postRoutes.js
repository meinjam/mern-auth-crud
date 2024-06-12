const express = require('express');
const { getPosts, createPost } = require('../controllers/postController');
const { requireAuth } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(requireAuth, getPosts).post(requireAuth, createPost);

module.exports = router;
