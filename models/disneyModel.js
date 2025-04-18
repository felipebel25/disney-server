const mongoose = require('mongoose');
// const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxLength: [
        255,
        'A tour name must have less or equal than 55 characters',
      ],
      minLength: [2, 'A tour name must have less than 2 characters'],
    },
    resort: {
      type: String,
      required: [true, 'A tour must have a resort'],
      trim: true,
      maxLength: [
        255,
        'A tour resort must have less or equal than 55 characters',
      ],
      minLength: [2, 'A tour resort must have less than 2 characters'],
    },
    city: {
      type: String,
      required: [true, 'A tour must have a city'],
      trim: true,
      maxLength: [
        255,
        'A tour city must have less or equal than 55 characters',
      ],
      minLength: [2, 'A tour city must have less than 2 characters'],
    },
    country: {
      type: String,
      required: [true, 'A tour must have a country'],
      trim: true,
      maxLength: [
        255,
        'A tour country must have less or equal than 55 characters',
      ],
      minLength: [2, 'A tour country must have less than 2 characters'],
    },
    location: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
    },
    url: {
      type: String,
      require: [true, 'Tour must have an url'],
    },
    images: {
      type: [String],
      required: [true, 'Assign at least an image to the tour'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// 2dsphere indexes support geospatial queries on an earth-like sphere.
tourSchema.index({ location: '2dsphere' });

// GUIDES Embbeding approach
// tourSchema.pre('save', async function (next) {
//   const guidesPromises = this.guides.map(async (id) => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// post save
// tourSchema.post('save', function (next) {
//   next();
// })

// pre ---> save ---> post
//  https://mongoosejs.com/docs/middleware.html

// QUERY MIDDLEWARE

// AGGREGATION MIDDLEWARE
// aggregation is the event when you use aggregation filters
// tourSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({
//     $match: { secretTour: { $ne: true } },
//   });
//   next();
// });

const Tour = mongoose.model('Tour', tourSchema);

// const testTour = new Tour({
//   name: 'Test Tour',
//   rating: 4.7,
//   price: 299,
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('ERROR', err);
//   });

module.exports = Tour;
