const ics = require('ics')
var stream = require('stream');

exports.createCSV = (req,res,next) => {
    var data = parseTimetable(req.body.data);
    var ics = generateICS(data)
    res.set("Content-Disposition", "attachment; filename=test.ics");
    res.set('Content-Type', 'text/plain');
    res.end(ics)
}


function createEvents(week, classX, course){
    var event = {}
    var classDate = new Date(2023,0,9,parseInt(classX.Time.slice(0,2)),parseInt(classX.Time.slice(2,4)));
    if(week>6)  //RECESS WEEK
        week++;
    classDate.setDate(classDate.getDate() + 7*week + classX.Day -1) // -1 because Monday starts on 1 not 0
    classDate.setHours(classDate.getHours() - 8)
    event.start = [
        classDate.getFullYear(),
        classDate.getMonth()+1,
        classDate.getDate(),
        classDate.getHours(),
        classDate.getMinutes()]; //FORMAT IS [2018, 5, 30, 6, 30]
    event.duration = parseTime(classX.Time);
    event.title = course.Course + " " + classX.ClassType;
    event.description = course.Title;
    event.location = classX.Venue;
    return event;
    }


function parseTime(time){
    var arr = time.split('to').map(function(time) {
        var hours   = parseInt(time.substr(0, 2), 10),
            minutes = parseInt(time.substr(2, 4), 10);
            return (hours * 60 + minutes);
    });
    minDiff = arr[1]-arr[0];
    var hour = Math.floor(minDiff/60);
    var min = minDiff - hour*60;
    return {hours:hour, minutes:min}
}


function generateICS(data){
    events = []
    for(i in data){
        course = data[i] //Extracts course details
        for(x in course.Classes){
            classX = course.Classes[x] //Avoid using class keyword
            for(i in classX.Weeks){
                week = classX.Weeks[i]
                events.push(createEvents(week-1,classX,course)) //Week 1 -> 0 
            } 
        }
    }
    return ics.createEvents(events, (error, value) => {
        if (error) {
          return
        }
        return value
    })

}

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
        if(data[0][i] != " " && i == 1){
            tempObj["Course"]=data[0][i];
            tempObj["Title"]=data[1][i];
            tempObj["AU"]=data[2][i];
            tempObj["S/U"]=data[3][i];
            tempObj["Type"]=data[4][i];
            tempObj["Index"]=data[5][i];
        }
        if(data[0][i] != " " && i != 1)
        {
            tempObj["Classes"]= tempArr // Pushes in all the classes collected before
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
            "ClassType": data[9][i],
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
    return fullData
    }