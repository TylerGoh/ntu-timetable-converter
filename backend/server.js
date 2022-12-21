const express = require("express");
const mongoose = require("mongoose");
const app = express();
const EXPRESS_APP_PORT = 5000;
const URI = process.env.MONGO_DB_URI;
const cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(URI, { useNewUrlParse: true }, () => {
  console.log("Connected to MongoDB");
});


app.post('/test',(req,res)=>{
  console.log(req.body.data)
  res.send("received")
})



app.listen(EXPRESS_APP_PORT, () =>
  console.log(`Express App is running on ${EXPRESS_APP_PORT}`)
);