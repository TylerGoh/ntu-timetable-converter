import React from "react";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useState } from "react";
import axios from 'axios'
import "./Timetable.css"

function Timetable() {
    const [textInput, setTextInput] = useState("");
    const [date, setDateInput] = useState(new Date());
    const handleSubmit = (e)=>{
        e.preventDefault();
        var text = textInput;
        var arr = text.split('\t');
        var arr2D = [];
        if(textInput === "") //Ensure field is not empty
            return
        while(arr[0] !== "Course"){
            if(arr.shift()) //Removes lines before course but stops if empty
                break;
        }
        if(arr.length%16 !== 0) //Check that there are 16 columns
            return
        while(arr.length) 
            arr2D.push(arr.splice(0,16));
        var data = arr2D[0].map((_, colIndex) => arr2D.map(row => row[colIndex]));
        axios.post( "/timetable", {data,date},{responseType: "blob"}).then(res=>{
            const href = URL.createObjectURL(res.data);
            // create "a" HTML element with href to file & click
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', 'timetable.ics'); //or any other extension
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        })
    }
    return(
        <div>
            <Form onSubmit={handleSubmit} className="timetable-form">
                <div className="form-grid-container">
                    <div className="form-grid-item">
                        <div className="form-group">
                        <Form.Label>Paste timetable:</Form.Label>
                        <Form.Control
                            className="timetable-textArea"
                            id="textAreaInput"
                            as="textarea"
                            rows={1}
                            onChange={(e)=>setTextInput(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <Button type="submit" style={{border:"20px"}}>Submit</Button>
                        </div>
                    </div>
                    <div className="form-grid-item">
                        <div className="form-group">
                        <Form.Label>Semester start date:</Form.Label>
                        <Form.Control
                            type="date"
                            value={date}
                            onChange={(e)=>setDateInput(e.target.value)}/>
                        </div>
                    </div>
                    

                </div>
            </Form>
        </div>
    )
}

export default Timetable