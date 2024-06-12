const express = require('express');
const app = express();
const createError = require('http-errors');

app.get('/', (request, response) => {
  const err = createError(401, 'Please login to view this page.');
  response.status(401).json(err);
});

app.listen(5600, () => {
  console.log('Server running on port 5600');
});
