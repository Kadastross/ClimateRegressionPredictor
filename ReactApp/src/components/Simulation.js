import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
//import './Simulation.css'
import {Link, withRouter } from 'react-router-dom'
import * as ROUTES from './Routes.js'

import HeatMap from './HeatMap.js'


class Simulation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            simID: -1,
            year: -1,
            co2: -1,
            simIDFound: "",
            viewSimID: -1,
            viewYear: -1,
            viewCO2: -1
        }
    }

    changeSimId = (e) => {
        this.setState({simID: e.target.value})
    }

    changeYear = (e) => {
        this.setState({year: e.target.value})
    }

    changeCo2 = (e) => {
        this.setState({co2: e.target.value})
    }

  
    create = () => {
        console.log("create")
        var data = {
            "simID":this.state.simID,
            "year": this.state.year,
            "co2": this.state.co2
        }
        fetch('http://127.0.0.1:5000/createSimulation' , {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then((data) => {
                console.log(data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    update = () => {
        console.log("update")
        var data = {
            "simID":this.state.simID,
            "year": this.state.year,
            "co2": this.state.co2
        }
        fetch('http://127.0.0.1:5000/updateSimulation' , {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then((data) => {
                console.log(data)
        })
        .catch((error) => {
            console.log(error)
        })

    }
    view = () => {
        console.log("view")
        var data = {
            "simID":this.state.simID
        }
        fetch('http://127.0.0.1:5000/viewSimulation' , {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then((data) => {
            console.log(data)
            if (data === "fail") {
                this.setState({simIDFound:"false"})
            } else {
                var stringSplit = data.split(" ")
                this.setState(
                    {viewSimID: stringSplit[0],
                    viewYear: stringSplit[1],
                    viewCO2: stringSplit[2],
                    simIDFound: "true"}
                )
            }

        })
        .catch((error) => {
            console.log(error)
        })
    }

    delete = () => {
        console.log("delete")
        var data = {
            "simID":this.state.simID,
        }
        fetch('http://127.0.0.1:5000/deleteSimulation' , {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then((data) => {
                console.log(data)

        })
        .catch((error) => {
            console.log(error)
        })
    }
    render() {
        console.log(this.state.simID)
        console.log(this.state.year)
        console.log(this.state.co2)
        console.log(this.state.viewResult)
        return (
        <div>
            <h1 className ="Sim-Header" style={{color:'white'}}> Welcome user123</h1>
            <Card style={{width: '25rem' }}>
                    <Card.Body>
                        <Card.Title>Create a Simulation</Card.Title>
                        <Card.Text>
                            <Form>
                                <Form.Label>Enter new Simulation ID (>=0)</Form.Label>
                                <Form.Control type="number" placeholder = "Sim ID" value={this.state.simID} onChange={this.changeSimId} />
                                <Form.Label style={{marginTop:"20px"}}>Password</Form.Label>
                                <Form.Control type="number" placeholder = "" />
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
            <h2>Create/Update a Simulation</h2>
            <div style={{marginTop:"10px"}}> <label>Enter a Simulation ID (must be a number >= 0)</label> </div>
            <div style={{marginTop:"10px"}}><input name="simID" value={this.state.simID} onChange={this.changeSimId} type="number" /></div>

            <div style={{marginTop:"10px"}}> <label >Year</label> </div>
            <div style={{marginTop:"10px"}}><input name="year" value={this.state.year} onChange={this.changeYear} type="number" /> </div>
            <div style={{marginTop:"10px"}}><label >CO2 Emissions</label></div>
            <div style={{marginTop:"10px"}}><input name="co2" value={this.state.co2} onChange={this.changeCo2} type="number" /> </div>
            <div style={{marginTop:"10px"}}>
                <button style={{marginRight:"10px"}} onClick={this.create}>Create</button>
                <button onClick={this.update}>Update</button>
            </div>
            
            
            <h2>View/Delete a Simulation</h2>
            <div><label style= {{color: 'white'}}> Enter the SimulationID of the Simulation to View/Delete </label></div>
            <div style={{marginTop:"10px"}}><input name="simID" value={this.state.simID} onChange={this.changeSimId} type="number" /></div>
            <div style={{marginTop:"10px"}}>
                <Button variant = "primary" style = {{marginRight:"10px"}} onClick={this.view}>View</Button>
                <button onClick={this.delete}>Delete</button>
            </div>
            {this.state.simIDFound === "false" &&
            <h3>There is no corresponding simulationID to View/Delete.</h3>
            }
            {this.state.simIDFound ==="true" &&
            <div>
            <h2>SimulationID: {this.state.viewSimID}</h2>
            <h2>Year: {this.state.viewYear}</h2>
            <h2>CO2 Emissions: {this.state.viewCO2}</h2>
            </div>
            }
            <Button variant="primary">Primary</Button>
            <HeatMap></HeatMap>
        </div>
        )
    }
}


export default Simulation;