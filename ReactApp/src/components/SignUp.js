import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Link, withRouter, Redirect } from 'react-router-dom'
import * as ROUTES from './Routes.js'
import ls from 'local-storage'

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: "",
            password:"",
            validSignUp: ""
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
                if (data === "xxF") {
                    this.setState({validSignUp: "false"})
                } else {
                    this.setState({validSignUp: "true"})
                }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <div className="Main-Background">
                <Card style={{marginTop:"17%", marginLeft: "35%", width: '25rem'}}>
                    <Card.Body>
                        <h3>Modeling Climate Change</h3>
                        <Card.Title>Sign Up</Card.Title>
                        <Card.Text>
                            <Form>
                                <Form.Label>Enter a User ID</Form.Label>
                                <Form.Control type="username" placeholder = "Enter UserID" value={this.state.userID} onChange={this.changeUserID} />
                                <Form.Label style={{marginTop:"20px"}}>Enter Password</Form.Label>
                                <Form.Control type="password" placeholder = "Enter Password" value={this.state.password} onChange={this.changePassword}/>
                                {this.state.validSignUp == "true" && 
                                        <Redirect to = {ROUTES.ROOT} />
                                }
                                {this.state.validSignUp == "false" && 
                                    <div>
                                        <Button style={{marginTop:"20px"}} variant="danger" onClick={this.createUser}>Sign Up</Button>
                                        <Form.Text style={{marginTop:"20px"}}>Username already exists. Please Select Another</Form.Text>
                                    </div>
                                }
                                {this.state.validSignUp == "" && 
                                    <div>
                                        <Button style={{marginTop:"20px"}} variant="danger" onClick={this.createUser}>Sign Up</Button>
                                    </div>
                                }
                                <Form.Text style={{marginTop:"20px"}} >
                                    <Link to={ROUTES.ROOT}> Already Have an Account. Log In </Link>
                                </Form.Text>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }


}


export default SignUp;
