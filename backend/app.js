const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const morgan = require("morgan")
const mongoose = require("mongoose");
const registerRoutes = require('./api/routes/register')
const timetableRoutes = require('./api/routes/timetable')
const URI = process.env.MONGO_DB_URI;

mongoose.set('strictQuery', false); //Just to stop the depreciation warnings
mongoose.connect("mongodb://mongo:27017/app", {
    useNewUrlParser: true,
    });

mongoose.connection.on('connected', () => {
    console.log('MongoDB is connected');
  });


app.use(morgan('dev'))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Routes
app.use('/register', registerRoutes)
app.use('/timetable', timetableRoutes)



  
module.exports = app;