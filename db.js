const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_CONNECTION_STRING || "mongodb://localhost:27017/substance?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToMongo = () => {
  mongoose.connect(
    mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("Connected to mongo!");
    }
  );
};

module.exports = connectToMongo;
