import React from "react";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useState } from "react";
import axios from 'axios'

function Timetable() {
    const [textInput, setTextInput] = useState("");

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
        axios.post(process.env.REACT_APP_URL + "/test", {data}).then(res=>{
            let result = res.data;
            console.log(result)
        })
    }
    return(
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Control 
                    id="textAreaInput"
                    as="textarea"
                    rows={3}
                    onChange={(e)=>setTextInput(e.target.value)}/>
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default Timetable