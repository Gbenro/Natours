const fs = require('fs');
const User = require('../models/userModels');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
  next();
});
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'route not yet defined',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'route not yet defined',
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'route not yet defined',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'route not yet defined',
  });
};
