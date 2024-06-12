const express = require('express');
const { getPosts, createPost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getPosts).post(protect, createPost);

module.exports = router;
