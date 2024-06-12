const express = require('express');
const { loginUser, signupUser, authUser } = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', signupUser);
router.route('/').get(requireAuth, authUser);

module.exports = router;
