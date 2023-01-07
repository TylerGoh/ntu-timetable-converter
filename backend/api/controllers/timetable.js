const ics = require('ics')

exports.createCSV = (req,res,next) => {
    var ics = createEvents(req.body.data,req.body.date);
    res.set("Content-Disposition", "attachment; filename=test.ics");
    res.set({'content-type': 'text/calendar; charset=utf-8'});
    res.end(ics)
}


function createEvent(date, week, class_, course){
    let event = {}
    date = date.split("-");
    var class_date = new Date(date[0],date[1],date[2],parseInt(class_.Time.slice(0,2)),parseInt(class_.Time.slice(2,4)));
    if(week>6)  //RECESS WEEK
    week++;
    class_date.setDate(class_date.getDate() + 7*week + class_.Day) //Moving x amount of days from semester start
    class_date.setHours(class_date.getHours() - 8) //To make it GMT +8
    event.start = [
        class_date.getFullYear(),
        class_date.getMonth()+1,
        class_date.getDate(),
        class_date.getHours(),
        class_date.getMinutes()]; //FORMAT IS [YYYY, MM, DD, HH, MM]
    event.duration = timeToDuration(class_.Time);
    event.title = course.Course + " " + class_.ClassType;
    event.description = course.Title;
    event.location = class_.Venue;
    return event;
    }


function timeToDuration(time){
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

function formatDay(day){
    day = day.replaceAll(' ', ''); //Some browsers add spaces
    const dayLookup = {
        'Mon':0,
        'Tue':1,
        'Wed':2,
        'Thu':3,
        'Fri':4,
        'Sat':5,
        'Sun':6,
    }
    return dayLookup[day]
    }
    
    
function remarkToWeeks(string){
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
    
function createEvents(data,date){
    let events = [];
    let course = {};
    for (var i in data[0]){
        if(i == 0)
        continue
        if(data[0][i] != " "){
            course.Course=data[0][i];
            course.Title=data[1][i];
            course.AU=data[2][i];
            course.SU=data[3][i];
            course.Type=data[4][i];
            course.Index=data[5][i];
        }
        let class_ = {
            "ClassType": data[9][i],
            "Group": data[10][i],
            "Day": formatDay(data[11][i]),
            "Time": data[12][i],
            "Venue": data[13][i],
            "Weeks": remarkToWeeks(data[14][i]),
        }
        //console.log(class_.Day)
        for(i in class_.Weeks){
            week = class_.Weeks[i]
            events.push(createEvent(date,week-1,class_,course)) //Week 1 -> 0 
        }
    }
    return ics.createEvents(events, (error, value) => {
        if (error) {
          return
        }
        return value
    })
}