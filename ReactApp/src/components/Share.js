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
            runData: {},
            successViewShare: "x"
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
                setTimeout(function(){
                    this.setState({successShare:""});
               }.bind(this),5000);
            } else {
                this.setState({successShare: "false"})
                setTimeout(function(){
                    this.setState({successShare:""});
               }.bind(this),5000);
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
        this.setState({successViewShare: ""})
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
                this.setState({runData: data, successViewShare: "true"})
            }
        })
        .catch((error) => {
            console.log(error)
            this.setState({successViewShare: "false"});
            setTimeout(function(){
                this.setState({successViewShare: "x"});
           }.bind(this),8000);
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
        console.log(this.state.successViewShare)
        return(
            <div >
                <h2 className="block-example border-bottom border-dark" style={{marginTop:"20px",marginLeft:"20px" , color:'white'}}> Share Your Simulations</h2>
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
                                        <Card.Text style={{marginTop:"20px"}}>This User Does Not Exist.</Card.Text>
                                    </div>
                                }
                                {this.state.successShare == "true" && 
                                    <div>
                                        <Card.Text style={{marginTop:"20px"}}>Simulation Shared Successfully!</Card.Text>
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
                                <Button style={{marginTop:"20px"}} variant="danger" onClick={this.run}>Run a Shared Simulation</Button>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
                </CardDeck>
                <div style = {{marginTop:"30px"}} >
                    {this.state.successViewShare == "true" && 
                        <div>
                            <h2 className="block-example border-bottom border-dark" style={{marginTop: "50px", marginLeft:"20px" , color:'white'}}>{this.state.userView}'s Co2 Emissions Graph</h2>
                            <LineGraph data={this.state.runData}></LineGraph>
                        </div>
                    }
                    {this.state.successViewShare == "false" && 
                            <div class="alert alert-danger" role="alert" style={{marginTop:"30px"}}>
                                Graph Failed! Please Contact the User of the Simulation.
                            </div>
                    }
                    {this.state.successViewShare == "" && 
                        <div>
                            <h2 className="block-example border-bottom border-dark" style={{marginTop: "50px", marginLeft:"20px" , color:'white'}}>Waiting For {this.state.userView}'s Graph ...</h2>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Share
