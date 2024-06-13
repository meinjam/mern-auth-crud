const express = require('express');
const { loginUser, signupUser, authUser } = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');
const { validateLogin, validateRegister } = require('../middleware/validateAuth');
const router = express.Router();

router.post('/login', validateLogin, loginUser);
router.post('/register', validateRegister, signupUser);
router.route('/').get(requireAuth, authUser);

module.exports = router;
