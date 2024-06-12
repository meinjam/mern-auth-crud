const express = require('express');
const { getPosts, createPost } = require('../controllers/postController');
const { requireAuth } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(requireAuth);

router.get('/', getPosts);
router.post('/', createPost);
// router.get('/:id', getSingleWorkout);
// router.patch('/:id', updateWorkout);
// router.delete('/:id', deleteSingleWorkout);

module.exports = router;
