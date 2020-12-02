import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'
import './Simulation.css'
import {Link, withRouter, Redirect } from 'react-router-dom'
import * as ROUTES from './Routes.js'
import HeatMap from './HeatMap.js'
import LineGraph from './LineGraph.js'
import ls from 'local-storage'

class Share extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            simulationNameList: [],
            userShare: "",
            userID: "",
            simShare: "",
            simView: "",
            userView: "",
            successShare: "",
            allSimSharedWithUser: [],
            displayOnViewSim: "",
            runData: {}
        }
    }

    componentDidMount = () => {
        let username = ls.get('username')
        this.setState({userID: username})
    }

    share = () => {
        var data = {
            "username":this.state.userID,
            "userShare": this.state.userShare,
            "simShare": this.state.simShare
        }
        fetch('http://127.0.0.1:5000/shareSimulations' , {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then((data) => {
            if (data === "1") {
                this.setState({successShare: "true"})
            } else {
                this.setState({successShare: "false"})
            }    
        })
        .catch((error) => {
            console.log(error)
        })
    }

    getAllSimName = () => {
        var data = {
            "username": this.state.userID
        }
        fetch('http://127.0.0.1:5000/getSimulationNames' , {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then((data) => {
            this.setState({simulationNameList: data})
            console.log(this.state.simulationNameList)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    changeUserShare = (e) => {
        this.setState({userShare: e.target.value})
    }

    changeSimShare = (e) => {
        this.setState({simShare: e.target.value})
    }

    changeSimView = (e) => {
        var temp = e.target.value.split(" ")
        this.setState({displayOnViewSim: e.target.value, simView: temp[0], userView: temp[1]})
    }

    run = () => {
        console.log("run")
        var data = {
            "simName": this.state.simView,
            "username": this.state.userView
        }
        fetch('http://127.0.0.1:5000/runSimulation' , {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            if (data === "fail") {
                this.setState({simIDFound:"false"})
            } else {
                // ls.set('modelData', data)
                this.setState({runData: data})
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    getAllSimSharedWithYou = () => {
        var data = {
            "username": this.state.userID
        }
        fetch('http://127.0.0.1:5000/findSharedSimulations' , {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then((data) => {
            this.setState({allSimSharedWithUser: data})
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        return(
            <div >
                <h1 className="block-example border-bottom border-dark" style={{marginTop:"20px",marginLeft:"20px" , color:'white'}}> Share Your Simulations</h1>
                <CardDeck style={{marginTop:"20px", marginLeft:"10px", marginRight:"10px"}}>
                <Card border = "danger" style={{width: '25rem'}}>
                    <Card.Body>
                        <Card.Title>Create a Simulation</Card.Title>
                        <Card.Text>
                            <Form>
                                <select style ={{marginTop: "20px"}} class="form-control" id="exampleFormControlSelect1" value = {this.state.simShare} onClick = {this.getAllSimName} onChange={this.changeSimShare}>
                                    <option>Select Simulation To Share</option>
                                    {this.state.simulationNameList.map(sim => {
                                            return (
                                                <option value = {sim}> {sim} </option>
                                            )
                                    })}
                                </select>
                                <Form.Label style = {{marginTop:"20px"}}>Enter User You Want to Share to</Form.Label>
                                <Form.Control type="username" placeholder = "Username" value={this.state.userShare} onChange={this.changeUserShare} />
                                <Button style={{marginTop:"20px"}} variant="danger" onClick={this.share}>Share Simulation</Button>
                                {this.state.successShare == "false" && 
                                    <div>
                                        <Form.Text style={{marginTop:"20px"}}>This User Does Not Exist.</Form.Text>
                                    </div>
                                }
                                {this.state.successShare == "true" && 
                                    <div>
                                        <Form.Text style={{marginTop:"20px"}}>Simulation Shared Successfully!</Form.Text>
                                    </div>
                                }
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card border = "danger" style={{width: '25rem'}}>
                    <Card.Body>
                        <Card.Title>View a Simulation That was Shared To You</Card.Title>
                        <Card.Text>
                            <Form>
                                <select style ={{marginTop: "20px"}} class="form-control" id="exampleFormControlSelect1" value = {this.state.displayOnViewSim} onClick = {this.getAllSimSharedWithYou} onChange={this.changeSimView}>
                                    <option>Select Simulation To View</option>
                                    {this.state.allSimSharedWithUser.map(sim => {
                                            return (
                                                <option value = {sim}> {sim} </option>
                                            )
                                    })}
                                </select>
                                <Button style={{marginTop:"20px"}} variant="danger" onClick={this.run}>View a Shared Simulation</Button>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
                </CardDeck>
                <div style = {{marginTop:"30px"}} >
                    <LineGraph data={this.state.runData}></LineGraph>
                </div>
            </div>
        )
    }
}

export default Share
