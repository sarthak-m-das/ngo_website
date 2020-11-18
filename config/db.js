const mongoose = require("mongoose");
// const config = require("config");
// const db = config.get("./mongoURI");

const connectDB = async () => {
  try {

    await mongoose.connect(
      "mongodb+srv://bitsofpaper:bitsofpaper@cluster0.ztpn8.mongodb.net/NGO?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;