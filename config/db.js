const mongoose = require('mongoose');

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI , {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })

    console.log('mongoDB connected')
  } catch(err) {
    console.log('connectDB-error :',err.message)
    process.exit(1);
  }
}

module.exports = connectDB;
