import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Link, withRouter } from 'react-router-dom'
import * as ROUTES from './Routes.js'
import ls from 'local-storage'

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password:""
        }
    }

    changeUsername =(e) => {
        this.setState({username: e.target.value })
        ls.set('username', e.target.value)
    }

    changePassword =(e) => {
        this.setState({password: e.target.value })
        ls.set('password', e.target.value)
    }
    logIn = () => {
        var data = {
            "username":this.state.username,
            "password":this.state.password
        }
        fetch('http://127.0.0.1:5000/logIn' , {
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
        console.log(this.state.username)
        console.log(this.state.password)
        return (
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop:"13%"}}>
                <Card style={{width: '25rem' }}>
                    <Card.Body>
                        <Card.Title>Log In</Card.Title>
                        <Card.Text>
                            <Form>
                                <Form.Label>User ID</Form.Label>
                                <Form.Control type="username" placeholder = "Enter UserID" value = {this.state.username} onChange={this.changeUsername}/>
                                <Form.Label style={{marginTop:"20px"}}>Password</Form.Label>
                                <Form.Control type="password" placeholder = "Enter Password" value = {this.state.password} onChange={this.changePassword}/>
                                <Link to={ROUTES.SIMULATIONS}>
                                    <Button to={ROUTES.SIMULATIONS} style={{marginTop:"20px"}} variant="primary" type="login" value = {this.state.username} onClick={this.logIn}>LogIn</Button>
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
