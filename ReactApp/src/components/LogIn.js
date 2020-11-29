import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Link, withRouter } from 'react-router-dom'
import * as ROUTES from './Routes.js'

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop:"13%"}}>
                <Card style={{width: '25rem' }}>
                    <Card.Body>
                        <Card.Title>Log In</Card.Title>
                        <Card.Text>
                            <Form>
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="username" placeholder = "Enter Username" />
                                <Form.Label style={{marginTop:"20px"}}>Password</Form.Label>
                                <Form.Control type="password" placeholder = "Enter Password" />
                                <Link to={ROUTES.SIMULATIONS}>
                                    <Button to={ROUTES.SIMULATIONS} style={{marginTop:"20px"}} variant="primary" type="login">LogIn</Button>
                                </Link>
                                <Form.Text style={{marginTop:"20px"}} >
                                    <Link to={ROUTES.SIGN_UP}> Don't Have an Account. Sign Up </Link> 
                                </Form.Text>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }

 
}


export default LogIn;