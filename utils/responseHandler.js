const generateResponse = (status, code, message, data = null, errors = null) => {
  return {
    status,
    code,
    message,
    data,
    errors,
  };
};

const successResponse = (code, message, data) => {
  return generateResponse('success', code, message, data);
};

const errorResponse = (code, message, errors) => {
  return generateResponse('error', code, message, null, errors);
};

module.exports = {
  successResponse,
  errorResponse,
};
