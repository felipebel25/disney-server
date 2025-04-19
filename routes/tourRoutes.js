const express = require('express');
const {
  getDistances,
} = require('../controllers/tourController');

// const { createReview } = require('../controllers/reviewController');

const router = express.Router();


router.route('/distances/:latLng/unit/:unit').get(getDistances);

module.exports = router;
