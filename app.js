const express = require('express');
// morgan helps to create logs for the app
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const app = express();

const tourRouter = require('./routes/tourRoutes');

const AppError = require('./utils/appError');
const errorController = require('./controllers/errorController');

// 1 GLOBAL Middlewares
// Security HTTP headers
app.use(helmet());

// Development loggin
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again in an hour.',
});

app.use('/api', limiter);

// Body parser, reading data from body into req.body object
app.use(express.json({ limit: '10kb' }));

// data sanitization against no SQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);
// Test middleware
app.use((req, res, next) => {
  req.requestTime = Date.now().toString();
  next();
});
const options = {
  origin: 'http://localhost:4321',
};
app.use(cors(options));
// 2 routes
app.use('/api/v1/disney', tourRouter);

// Error handling middleware 404
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorController);
module.exports = app;
