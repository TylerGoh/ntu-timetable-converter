const express = require("express");
const router = express.Router();

router.post('/',(req,res)=>{
    parseTimetable(req.body.data);
    res.status(200).json({message:"Received"});
})
  
  

function parseDay(string){
const dayLookup = {
    "Mon":1,
    "Tue":2,
    "Wed":3,
    "Thu":4,
    "Fri":5,
    "Sat":6,
    "Sun":7,
}
return dayLookup[string]
}


function parseRemark(string){
string = string.slice(11)
var temp = string.split(",")
if(temp.length > 1)
    return temp.map(function(x){
    return parseInt(x)
    })
else
{
    let temp = [];
    range = string.split("-")
    for (let i = parseInt(range[0]); i < parseInt(range[1]); i++) {
    temp.push(i);
    }
    return temp
}

}

function parseTimetable(data){
var fullData = [];
var tempObj = {};
var tempArr = [];
for (var i in data[0]){
    if(i == 0)
    continue
    if(data[0][i] != " " && i != 1)
    {
        tempObj["Classes"]= tempArr
        fullData.push(tempObj)
        tempObj = {}
        tempArr = []
        tempClasses = {}
        tempObj["Course"]=data[0][i];
        tempObj["Title"]=data[1][i];
        tempObj["AU"]=data[2][i];
        tempObj["S/U"]=data[3][i];
        tempObj["Type"]=data[4][i];
        tempObj["Index"]=data[5][i];
        
    }
    tempArr.push({
        "Class Type": data[9][i],
        "Group": data[10][i],
        "Day": parseDay(data[11][i]),
        "Time": data[12][i],
        "Venue": data[13][i],
        "Weeks": parseRemark(data[14][i]),
    })
    }
    tempObj["Classes"]= tempArr
    fullData.push(tempObj)
    tempObj = {}
    tempArr = []
    tempClasses = {}
    tempObj["Course"]=data[0][i];
    tempObj["Title"]=data[1][i];
    tempObj["AU"]=data[2][i];
    tempObj["S/U"]=data[3][i];
    tempObj["Type"]=data[4][i];
    tempObj["Index"]=data[5][i];
console.log(fullData[2].Classes)
}

module.exports = router;