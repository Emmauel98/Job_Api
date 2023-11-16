const mongoose = require("mongoose");

const connectToDB = async (url) => {
  try {
    const connect = mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      tlsAllowInvalidCertificates: true,
    });
    console.log("connected to database ");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDB;
