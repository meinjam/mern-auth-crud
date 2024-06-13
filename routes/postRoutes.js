const express = require('express');
const { getPosts, createPost, updatePost, getSinglePost, deletePost } = require('../controllers/postController');
const { requireAuth } = require('../middleware/authMiddleware');
const { validatePostCreate, validatePostUpdate } = require('../middleware/validatePost');
const { checkValidId } = require('../middleware/validate');
const router = express.Router();

router.use(requireAuth);

router.get('/', getPosts);
router.post('/', validatePostCreate, createPost);
router.get('/:id', checkValidId, getSinglePost);
router.patch('/:id', validatePostUpdate, checkValidId, updatePost);
router.delete('/:id', checkValidId, deletePost);

module.exports = router;
