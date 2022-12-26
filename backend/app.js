const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const morgan = require("morgan")
const mongoose = require("mongoose");
const URI = process.env.MONGO_INITDB_URI;
const session = require("express-session")
const { createClient } = require("redis")
let RedisStore = require("connect-redis")(session)
let redisClient = createClient({ 
  legacyMode: true,
  socket:{
  host: 'redis',
  port: 6379,
} })
redisClient.connect().catch(console.error)

const userRoutes = require('./api/routes/user')
const timetableRoutes = require('./api/routes/timetable')

mongoose.set('strictQuery', false); //Just to stop the depreciation warnings
mongoose.connect(URI, {
    useNewUrlParser: true,
    });

mongoose.connection.on('connected', () => {
    console.log('MongoDB is connected');
  });

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "keyboard cat",
    saveUninitialized: false,
    resave: false,
    cookie:{
      secure: false,
      httpOnly: true,
      maxAge: 30000
    }
  })
)
    
app.use(morgan('dev'))
app.use(cors({
  credentials:true,
  origin: true,
}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Routes
app.use('/user', userRoutes)
app.use('/timetable', timetableRoutes)



  
module.exports = app;