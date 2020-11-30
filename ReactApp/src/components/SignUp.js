import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Link, withRouter } from 'react-router-dom'
import * as ROUTES from './Routes.js'
import ls from 'local-storage'

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: "",
            password:""
        }
    }


    changeUserID = (e) => {
        this.setState({userID: e.target.value})
        ls.set('username', e.target.value)
    }

    changePassword = (e) => {
        this.setState({password: e.target.value})
    }

    createUser = () => {
        console.log("create user")
        var data = {
            "userID":this.state.userID,
            "password": this.state.password
        }
        fetch('http://127.0.0.1:5000/signUp' , {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then((data) => {
                console.log(data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop:"13%"}}>
                <Card style={{width: '25rem' }}>
                    <Card.Body>
                        <Card.Title>Sign Up</Card.Title>
                        <Card.Text>
                            <Form>
                                <Form.Label>Enter a User ID</Form.Label>
                                <Form.Control type="username" placeholder = "Enter UserID" value={this.state.userID} onChange={this.changeUserID} />
                                <Form.Label style={{marginTop:"20px"}}>Enter Password</Form.Label>
                                <Form.Control type="password" placeholder = "Enter Password" value={this.state.password} onChange={this.changePassword}/>
                                <Link to={ROUTES.SIMULATIONS}>
                                    <Button style={{marginTop:"20px"}} variant="primary" type="login" onClick={this.createUser}>Sign Up</Button>
                                </Link>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }


}


export default SignUp;
