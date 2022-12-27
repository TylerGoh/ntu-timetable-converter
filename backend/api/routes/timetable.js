const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
  
const TimetableController = require('../controllers/timetable');

router.post('/', TimetableController.createCSV)

module.exports = router;