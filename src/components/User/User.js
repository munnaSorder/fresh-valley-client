import React, { useContext } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { UserContext } from '../../App';
import { loginInitialMethod, signOut } from '../Auth/loginManagement';

const User = () => {
    const [ loggedInUser ] = useContext(UserContext)
    const logOut = () => {
        loginInitialMethod();
        signOut();
    }
    
    return (
        <Container className="mt-5">
            <Row>
                <Col md={4}>
                    {
                        loggedInUser.photoURL ? (
                            <img className="w-100 img-fluid rounded" src={loggedInUser.photoURL} alt="" />
                        ) : (
                            <img className="w-100 img-fluid rounded" src="https://www.ecpgr.cgiar.org/fileadmin/templates/ecpgr.org/Assets/images/No_Image_Available.jpg" alt="" />
                        )
                    }                  
                </Col>
                <Col md={8}>
                    <h3>Name: {loggedInUser.displayName}</h3>
                    <h6>Email: {loggedInUser.email}</h6>
                    <div className="mt-3">
                        <button className="mr-2 btn-warning btn" onClick={() => logOut()}>Log Out</button>
                        <Button onClick={() => alert('not Available')}>Update Profile</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default User;