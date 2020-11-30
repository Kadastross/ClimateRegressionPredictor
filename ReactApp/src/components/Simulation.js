import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'
import './Simulation.css'
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
        <div className="Sim-Background">
            <h1 className="block-example border-bottom border-dark" style={{marginLeft:"20px" , color:'white'}}> Modeling Climate Change</h1>
            {/* <h1 className ="Sim-Header" style={{color:'white'}}> _____________________________________________________________________________________</h1> */}
            {/* <h1 className="Sim-Header" style={{color:"white"}}>Heat Map</h1> */}
            {/* <h1 className ="Sim-Header" style={{color:'white'}}> _____________________________________________________________________________________</h1> */}
            <h2 className="block-example border-bottom border-dark" style={{marginTop: "50px", marginLeft:"20px" , color:'white'}}>Heat Map</h2>
            <HeatMap></HeatMap>
            <h2 className="block-example border-bottom border-dark" style={{marginLeft:"20px" , color:'white'}}>Create a Predictive Climate Simulation</h2>
            <CardDeck style={{marginTop:"20px", marginLeft:"10px", marginRight:"10px"}}>
            <Card border = "danger" style={{width: '25rem'}}>
                    <Card.Body>
                        <Card.Title>Create a Simulation</Card.Title>
                        <Card.Text>
                            <Form>
                                <Form.Label>Enter new Simulation ID (>=0)</Form.Label>
                                <Form.Control type="number" placeholder = "Sim ID" value={this.state.simID} onChange={this.changeSimId} />
                                <Form.Label style={{marginTop:"20px"}}>Enter Year</Form.Label>
                                <Form.Control type="number" placeholder = "Year" value={this.state.year} onChange={this.changeYear}/>
                                <Form.Label style={{marginTop:"20px"}}>Enter CO2 Emissions</Form.Label>
                                <Form.Control type="number" placeholder = "CO2 Emissions" value={this.state.co2} onChange={this.changeCo2}/>
                                <Button style={{marginTop:"20px"}} variant="danger" onClick={this.create}>Create Simulation</Button>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card  border = "danger" style={{width: '25rem' }}>
                    <Card.Body>
                        <Card.Title>Update a Simulation</Card.Title>
                        <Card.Text>
                            <Form>
                                <Form.Label>Enter Simulation ID to update</Form.Label>
                                <Form.Control type="number" placeholder = "Sim ID" value={this.state.simID} onChange={this.changeSimId} />
                                <Form.Label style={{marginTop:"20px"}}>Enter New Year</Form.Label>
                                <Form.Control type="number" placeholder = "Year" value={this.state.year} onChange={this.changeYear}/>
                                <Form.Label style={{marginTop:"20px"}}>Enter New CO2 Emissions</Form.Label>
                                <Form.Control type="number" placeholder = "CO2 Emissions" value={this.state.co2} onChange={this.changeCo2}/>
                                <Button style={{marginTop:"20px"}} variant="danger" onClick={this.update}>Update Simulation</Button>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card  border = "danger" style={{width: '25rem' }}>
                    <Card.Body>
                        <Card.Title>Delete a Simulation</Card.Title>
                        <Card.Text>
                            <Form>
                                <Form.Label>Enter Simulation ID to Delete</Form.Label>
                                <Form.Control type="number" placeholder = "Sim ID" value={this.state.simID} onChange={this.changeSimId} />
                                <Button style={{marginTop:"20px"}} variant="danger" onClick={this.delete}>Delete Simulation</Button>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card  border = "danger" style={{width: '25rem' }}>
                    <Card.Body>
                        <Card.Title>View a Simulation</Card.Title>
                        <Card.Text>
                            <Form>
                                <Form.Label>Enter Simulation ID to View</Form.Label>
                                <Form.Control type="number" placeholder = "Sim ID" value={this.state.simID} onChange={this.changeSimId} />
                                <Button style={{marginTop:"20px"}} variant="danger" onClick={this.view}>View Simulation</Button>
                                {this.state.simIDFound === "false" &&
                                <Form.Text>There is no corresponding simulationID to View/Delete.</Form.Text>
                                }
                                {this.state.simIDFound ==="true" &&
                                <div>
                                <Form.Text>SimulationID: {this.state.viewSimID}</Form.Text>
                                <Form.Text>Year: {this.state.viewYear}</Form.Text>
                                <Form.Text>CO2 Emissions: {this.state.viewCO2}</Form.Text>
                                </div>
                                }
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
                </CardDeck>
                <h1 style={{color:"black"}}>xyz</h1>
        </div>
        )
    }
}


export default Simulation;