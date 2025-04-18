const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Unhandled Rejections is for example for something that doesn't exist in the code.
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down');
  console.log({ name: err.name, message: err.message, err });
  process.exit(1);
});

const app = require('./app');

dotenv.config({
  path: './config.env',
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  `${process.env.DATABASE_PASSWORD}`,
);

mongoose.connect(DB).then(() => {
  console.log('DB connection successfull!');
});

// 4 Start server
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// Unhandled Rejections is for example for password mongodb incorrectly.
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down');
  console.log({ name: err.name, message: err.message, err });
  server.close();
  process.exit(1);
});
