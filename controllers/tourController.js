const Tour = require('../models/disneyModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require('./handleFactory');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,ratingsAverage';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.createTour = createOne(Tour);
exports.editTour = updateOne(Tour);
exports.removeTour = deleteOne(Tour);

exports.getAllTours = getAll(Tour);
exports.getTour = getOne(Tour, { path: 'reviews' });

// e.g /v1/tours/distances/34.074052985283764,-118.40064801489154/unit/mi
exports.getDistances = catchAsync(async (req, res, next) => {
  const { latLng, unit } = req.params;
  // good approach to destructure an array
  const [lat, lng] = latLng.split(',');
  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;
  if (!lat || !lng) {
    next(
      new AppError(
        400,
        'Please provide a latitude and longitude in the format lat,lng.',
      ),
    );
  }
  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
        resort: 1,
        city: 1,
        country: 1,
        'location.coordinates': 1,
        images: 1,
        url: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: distances,
    },
  });
});
