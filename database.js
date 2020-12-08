const mongoose = require('mongoose')

// const { MONGODB_HOST, MONGODB_DB } = process.env;
// const MONGODB_URI = `mongodb://${MONGODB_HOST}/${MONGODB_DB}`;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((db) => console.log("DB is CONNECTED"))
  .catch((err)=> console.error(err))