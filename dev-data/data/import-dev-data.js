const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Tour = require('../../models/disneyModel');

dotenv.config({
  path: './config.env',
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  `${process.env.DATABASE_PASSWORD}`,
);

mongoose.connect(DB).then(() => {
  console.log('DB connection successful!');
});

// Read JSON data
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

// Delete data from MongoDB Collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted successfully!');
  } catch (error) {
    console.error('Error deleting data', error);
  }
  process.exit();
};

// Import data into MongoDB
const importData = async () => {
  try {
    await Tour.create(tours);

    console.log('Data imported successfully!');
  } catch (error) {
    console.error('Error importing data', error);
  }
  process.exit();
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
// node ./dev-data/data/import-dev-data.js --delete
