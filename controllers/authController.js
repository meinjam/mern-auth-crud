const User = require('../models/User');
const createToken = require('../utils/generateToken');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json(
        errorResponse(400, 'Incorrect email.', {
          msg: 'Incorrect email address.',
          path: 'email',
        })
      );
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json(
        errorResponse(400, 'Incorrect password.', {
          msg: 'Incorrect password.',
          path: 'password',
        })
      );
    }

    // create token
    const token = createToken(user.id);
    res.status(200).json(successResponse(200, 'Login successfully', { user, token }));
  } catch (error) {
    res.status(400).json(errorResponse(400, 'Something went wrong', error.message));
  }
};

const signupUser = async function (req, res) {
  const { name, email, password } = req.body;

  try {
    // const user = await User.signup(name, email, password);
    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json(
        errorResponse(400, 'Email already taken', {
          msg: 'Email already in use.',
          path: 'email',
        })
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hash });

    // create token
    const token = createToken(user.id);

    res.status(200).json(successResponse(200, 'Register successfully', { user, token }));
  } catch (error) {
    res.status(400).json(errorResponse(400, 'Something went wrong', error.errors));
  }
};

const authUser = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];
  const { id } = jwt.verify(token, JWT_SECRET);

  try {
    const user = await User.findOne({ _id: id });
    res.status(200).json(successResponse(200, 'Info retrieved successfully', { user, token }));
  } catch (error) {
    res.status(400).json(errorResponse(400, 'Something went wrong', error.errors));
  }
};

module.exports = { loginUser, signupUser, authUser };
