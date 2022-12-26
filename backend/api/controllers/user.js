const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require('../models/user');

exports.user_signup = (req, res, next) => {
    User.find({username: req.body.username})
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
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: hash
            });
            user.save().then(result=>{
                res.status(200).json({
                    message:"User created"
                })
            }).catch(err => console.log(err))  
        
        })
        
    })
}

exports.user_login = (req, res, next)=>{
    if(req.session.username)
        console.log(req.session.username)
    User.find({username: req.body.username})
        .exec()
        .then(user=>{
            if(user.length < 1){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, compareRes) =>{
                if(err){
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if(!compareRes){
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                req.session._id = user[0]._id
                req.session.username = user[0].username;
                return res.status(200).json({
                    message: 'Auth successful'
                })

            })
        })
}