import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar(){
    return(
        <Navbar bg="light">
            <Nav className='me-auto'>
                <Nav.Link href="/">Home</Nav.Link>
            </Nav>
            <Nav className='ms-auto'>
                <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default NavigationBar