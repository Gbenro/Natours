const fs = require('fs');
const User = require('../models/userModels');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

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

exports.updateMe = catchSync(async (req, res, next) => {
  //1) Create error if user Posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This app is not for password update please use /updateMyPassword',
        400
      )
    );
  }
  //2)filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
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
