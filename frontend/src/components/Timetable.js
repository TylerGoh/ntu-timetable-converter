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
        var newArr = [];
        while(arr[0] !== "Course")
        {
            if(arr.shift())
                break;
        }
        while(arr.length) 
            newArr.push(arr.splice(0,16));
        console.table(newArr)
        axios.post(process.env.REACT_APP_URL + "/test", newArr).then(res=>{
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