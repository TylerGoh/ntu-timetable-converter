const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Account = require('../models/account');


router.post('/',(req,res)=>{
    console.log(mongoose.connection.readyState);
    const account = new Account({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password,
    });
    account.save().then(result=>{
        res.status(200).json({result})
    }).catch(err => console.log(err))
  })

module.exports = router;