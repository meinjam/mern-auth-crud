const { default: mongoose } = require('mongoose');
const { errorResponse } = require('../utils/responseHandler');

const checkValidId = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json(errorResponse(404, 'Post not found'));
  }

  next();
};

module.exports = { checkValidId };
