const Express = require("express");
const mongoose = require("mongoose");
const expressApp = new Express();
const EXPRESS_APP_PORT = 5000;
const URI = process.env.MONGO_DB_URI;
mongoose.connect(URI, { useNewUrlParse: true }, () => {
  console.log("Connected to MongoDB");
});

expressApp.listen(EXPRESS_APP_PORT, () =>
  console.log(`Express App is running on ${EXPRESS_APP_PORT}`)
);
