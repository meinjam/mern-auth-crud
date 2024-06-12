const mongoose = require('mongoose');
const { MONGODB_URI } = require('../utils/config');

const connectDB = async () => {
  await mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.info('connected to MongoDB');
    })
    .catch((error) => {
      console.error(error.message);
    });
};

module.exports = connectDB;
