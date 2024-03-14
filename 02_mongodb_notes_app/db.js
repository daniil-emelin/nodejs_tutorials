const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const MONGODB_URL = "mongodb://127.0.0.1:27017/notes-app";

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);

    console.log("DB Connection Successful!");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectToDB;
