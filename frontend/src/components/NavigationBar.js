import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
function NavigationBar(){
    return(
        <Navbar bg="light">
            <Nav className='me-auto'>
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/timetable">Timetable</Nav.Link>
            </Nav>
            <Nav className='ms-auto'>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default NavigationBar