const { body, validationResult } = require('express-validator');
const { errorResponse } = require('../utils/responseHandler');

const validatePostCreate = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long'),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long'),
  body('isActive').isBoolean().withMessage('isActive must be a boolean'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errorResponse(400, 'Failed to create post', errors.array()));
    }
    next();
  },
];

const validatePostUpdate = [
  body('title')
    .optional()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long'),
  body('description')
    .optional()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errorResponse(400, 'Failed to create post', errors.array()));
    }
    next();
  },
];

module.exports = { validatePostCreate, validatePostUpdate };
