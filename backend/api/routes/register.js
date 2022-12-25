const express = require('express');
const router = express.Router();

router.post('/',(req,res)=>{
    console.log(req.body.data);
    res.send("Registered")
  })

module.exports = router;