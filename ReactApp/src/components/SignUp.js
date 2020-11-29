import React from 'react';
import './Simulation.css'
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignUp extends React.Component {
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
                        <Card.Title>Sign Up</Card.Title>
                        <Card.Text>
                            <Form>
                                <Form.Label>Enter a User Name</Form.Label>
                                <Form.Control type="username" placeholder = "Enter Username" />
                                <Form.Label>Enter Password</Form.Label>
                                <Form.Control type="password" placeholder = "Enter Password" />
                                <Button style={{marginTop:"20px"}} variant="primary" type="login">Sign Up</Button>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }

 
}


export default SignUp;