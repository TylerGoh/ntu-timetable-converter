import {React, useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import './Login.css'
import axios from 'axios'

function Register(){

    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const setField = (field,value) =>{
        setForm({
        ...form,
        [field]:value});

        if(!!errors[field])
        setErrors({
            ...errors,
            [field]:null
        });
    }

    const validateForm = () => {
        const {username, password} = form;
        const newErrors = {};
        if(!username || username === '') newErrors.username = "Please enter a username"
        else if(username.length < 8) newErrors.username = "Ensure your username is at least 5 characters"
        if(!password || password === '') newErrors.password = "Please enter a password"
        else if(password.length < 8) newErrors.password = "Ensure your password is at least 8 characters"
        return newErrors
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const formErrors = validateForm();
        if(Object.keys(formErrors).length>0){
            setErrors(formErrors)
        }
        else{
            console.log("submitted")
        }
        axios.post("/register",{data:form}).then(res=>{
            let result = res.data;
            console.log(result)})
    }
    return(
        <div className='color-overlay d-flex justify-content-center align-items-center'>
            <Form className='rounded form p-4 p-sm-3'>
                <Form.Group className='mb-3' controlId='formUsername'>
                    <Form.Label className='label'>Username</Form.Label>
                    <Form.Control 
                        type="username" 
                        placeholder='Enter username'
                        onChange={(e)=>setField('username',e.target.value)}
                        isInvalid={!!errors.username}/>
                    <Form.Control.Feedback type="invalid">
                        {errors.username}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formPassword'>
                    <Form.Label className='label'>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder='Enter password'
                        onChange={(e)=>setField('password',e.target.value)}
                        isInvalid={!!errors.password}/>
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                    <Form.Text className='text-muted'>
                    Already have an account?&nbsp;
                    <Link to="/login">
                        Login
                    </Link>
                    </Form.Text>
                </Form.Group>
                <Button variant ="primary" type="submit" onClick={handleSubmit}>Register</Button>
            </Form>
        </div>
    )
}

export default Register