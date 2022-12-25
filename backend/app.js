const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const morgan = require("morgan")
const registerRoutes = require('./api/routes/register')
const timetableRoutes = require('./api/routes/timetable')


app.use(morgan('dev'))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Routes
app.use('/register', registerRoutes)
app.use('/timetable', timetableRoutes)



  
module.exports = app;