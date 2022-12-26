import {React, useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import './Login.css'
import axios from 'axios'

function Login(){

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

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post("/user/login",form).then((res)=>{
            console.log(res)
            }).catch((err)=>{
                console.log(err)
                if(err.response.status === 401)
                    setErrors({
                        username: "Invalid username or password"
                    })
            })
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
                        onChange={(e)=>setField('password',e.target.value)}/>
                    <Form.Text className='text-muted'>
                    Don't have an account yet?&nbsp;
                    <Link to="/register">
                        Sign up
                    </Link>
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId='formBasicCheckbox'>
                    <Form.Check type="checkbox" label="Remember Me"></Form.Check>
                </Form.Group>
                <Button variant ="primary" type="submit" onClick={handleSubmit}>Login</Button>
            </Form>
        </div>
    )
}

export default Login