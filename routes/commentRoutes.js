const express = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const { addComment, addReply } = require('../controllers/commentController');
const router = express.Router();

router.use(requireAuth);

router.post('/comment', addComment);
router.post('/reply', addReply);

module.exports = router;
