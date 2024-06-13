const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../utils/config');
const { errorResponse } = require('../utils/responseHandler');

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json(errorResponse(401, 'Authorization token required'));
  }

  const token = authorization.split(' ')[1];

  try {
    const { id } = jwt.verify(token, JWT_SECRET);

    req.user = await User.findOne({ _id: id }).select('_id');
    next();
  } catch (error) {
    // console.log(error);
    res.status(401).json(errorResponse(401, 'Request is not authorized'));
  }
};

const getAuthUser = async (authorization) => {
  const token = authorization.split(' ')[1];
  const { id } = jwt.verify(token, JWT_SECRET);
  const user = await User.findOne({ _id: id });
  return { user, token };
};

module.exports = { requireAuth, getAuthUser };
