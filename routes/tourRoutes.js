const express = require('express');
const {
  getAllTours,
  createTour,
  getDistances,
} = require('../controllers/tourController');

// const { createReview } = require('../controllers/reviewController');

const router = express.Router();

router.route('/').get(getAllTours).post(createTour);

router.route('/distances/:latLng/unit/:unit').get(getDistances);

module.exports = router;
