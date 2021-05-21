import React, { useContext, useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navbar.css'
import logo from '../../image/logo/logo.png'
import { UserContext } from '../../App';
import { Avatar, makeStyles } from '@material-ui/core';


const NavBar = () => {
    const [loggedInUser] = useContext(UserContext)
    const [admin, setAdmin] = useState([]);

    const filterAdmin = admin.find(doc => doc.email === loggedInUser.email)
    useEffect(() => {
        fetch('https://salty-earth-64211.herokuapp.com/getAdminList')
        .then(res => res.json())
        .then(data => setAdmin(data))
    }, [])
    
    return (
       <Container>
            <Navbar expand="lg" className="mt-3">
            <Navbar.Brand href="/"><img width="200" src={logo} alt="logo" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Link to="/" className="nav-link mr-5">
                        Home
                    </Link>
                    <Link to="/order" className="nav-link mr-5">
                        Orders
                    </Link>
                    <Link to="/#" className="nav-link mr-5">
                        Deals
                    </Link>
                    {
                        filterAdmin?.email ? (
                            <Link to="/admin" className="nav-link mr-5">
                                Admin
                            </Link>
                        ) : (
                            null
                        )
                    }
                    {
                        loggedInUser.email ? (
                            <Link to="/user" className="nav-link mr-5">
                                <Avatar style={{width: '35px', height: '35px'}} alt={loggedInUser.displayName} src={loggedInUser.photoURL} />
                            </Link>
                        ):(
                            <Link to="/login" className="nav-link login-btn mr-5">
                            Login
                            </Link>
                        )
                    }
                </Nav>
                </Navbar.Collapse>
            </Navbar>
       </Container>
    );
};

export default NavBar;