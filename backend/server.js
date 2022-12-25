const mongoose = require("mongoose");
const URI = process.env.MONGO_DB_URI;
const EXPRESS_APP_PORT = 5000;
const app = require('./app');


mongoose.connect(URI, { useNewUrlParse: true }, () => {
  console.log("Connected to MongoDB");
});


app.listen(EXPRESS_APP_PORT, () =>
  console.log(`Express App is running on ${EXPRESS_APP_PORT}`)
);