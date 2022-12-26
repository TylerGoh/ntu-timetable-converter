const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Account = require('../models/account');

exports.user_signup = (req, res, next) => {
    Account.find({username: req.body.username})
    .exec()
    .then(user=>{
        if(user.length > 0){
            return res.status(409).json({
                message: "Username exists"
            })
        } 
        bcrypt.hash(req.body.password, 10, (err, hash)=>{
            if(err){
                return res.status(500).json({
                    error:err
                });
            } 
            const account = new Account({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: hash
            });
            account.save().then(result=>{
                res.status(200).json({
                    message:"User created"
                })
            }).catch(err => console.log(err))  
        
        })
        
    })
}