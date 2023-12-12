const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const colors = require("colors");
const connectDb = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URL);
    // await mongoose.connect("mongodb://127.0.0.1:27017");
    await mongoose.connect("mongodb://mongo:27017/db",{useNewUrlParser:true,useUnifiedTopology: true});
    // await mongoose.connect(process.env.MONGO_URL);
    // console.log(`Server Running On ${mongoose.connection.host}`.bgCyan.white);
  } catch (error) {
    console.log(`${error}`.bgRed);
  }
};

module.exports = connectDb;
