import {React, useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"
import './Login.css'

function Login(){
    return(
        <div className='color-overlay d-flex justify-content-center align-items-center'>
            <Form className='rounded form p-4 p-sm-3'>
                <Form.Group className='mb-3' controlId='formUsername'>
                    <Form.Label className='label'>Username</Form.Label>
                    <Form.Control type="username" placeholder='Enter username'/>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formPassword'>
                    <Form.Label className='label'>Password</Form.Label>
                    <Form.Control type="password" placeholder='Enter password'/>
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
                <Button variant ="primary" type="submit">Login</Button>
            </Form>
        </div>
    )
}

export default Login