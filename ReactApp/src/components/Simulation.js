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
import LineGraph from './LineGraph.js'
import ls from 'local-storage'

class Simulation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            simID: "",
            year: -1,
            co2: -1,
            country:"",
            countryData: [],
            simulationNameList: [],
            yearList: [],
            simIDFound: "",
            viewData: [],
            userID: ""
        }
    }

    componentDidMount = () => {
        let username = ls.get('username')
        this.setState({userID: username})
        console.log(this.state.userID)
        fetch('http://127.0.0.1:5000/getCountries' , {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET",
        })
        .then(response => response.json())
        .then((data) => {
            this.setState({countryData: data})
        })
        .catch((error) => {
            console.log(error)
        })
    }

    getAllSimName = () => {
        console.log("called")
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

    getYearData = () => {
        var data = {
            "username": this.state.userID,
            "simName": this.state.simID
        }
        fetch('http://127.0.0.1:5000/getYearData' , {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then((data) => {
            this.setState({yearList: data})
        })
        .catch((error) => {
            console.log(error)
        })

        console.log('executed')
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

    changeCountry = (e) => {
        this.setState({country: e.target.value})
    }

    addNewDataPoint = () => {
        var data = {
            "year": this.state.year,
            "co2": this.state.co2,
            "simName":this.state.simID,
            "username": this.state.userID
        }

        fetch('http://127.0.0.1:5000/addNewDataPoint' , {
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

    create = () => {
        console.log("create")
        var data = {
            "simName":this.state.simID,
            "username": this.state.userID,
            "country": this.state.country
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
            "simName":this.state.simID,
            "year": this.state.year,
            "co2": this.state.co2,
            "username": this.state.userID
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
            "simName":this.state.simID,
            "username": this.state.userID
        }
        fetch('http://127.0.0.1:5000/viewSimulation' , {
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
                this.setState({viewData: data})
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    delete = () => {
        console.log("delete")
        var data = {
            "simName":this.state.simID,
            "username": this.state.userID
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
        // console.log(this.state.simID)
        // console.log(this.state.year)
        // console.log(this.state.co2)
        // console.log(this.state.viewResult)
        // console.log(this.state.userID)
        // console.log(this.state.country)

        return (
        <div className="Sim-Background">
            <h1 className="block-example border-bottom border-dark" style={{marginLeft:"20px" , color:'white'}}> Modeling Climate Change</h1>
            <h2 className="block-example border-bottom border-dark" style={{marginTop: "50px", marginLeft:"20px" , color:'white'}}>Heat Map</h2>
            <HeatMap></HeatMap>
            <h2 className="block-example border-bottom border-dark" style={{marginTop: "50px", marginLeft:"20px" , color:'white'}}>Co2 Emissions Graph</h2>
            <LineGraph></LineGraph>
            <h2 className="block-example border-bottom border-dark" style={{marginLeft:"20px" , color:'white'}}>Create a Predictive Climate Simulation</h2>
            <CardDeck style={{marginTop:"20px", marginLeft:"10px", marginRight:"10px"}}>
            <Card border = "danger" style={{width: '25rem'}}>
                    <Card.Body>
                        <Card.Title>Create a Simulation</Card.Title>
                        <Card.Text>
                            <Form>
                                <Form.Label>Enter new Simulation Name</Form.Label>
                                <Form.Control type="username" placeholder = "Simulation Name" value={this.state.simID} onChange={this.changeSimId} />
                                <select style ={{marginTop: "20px"}} class="form-control" id="exampleFormControlSelect1" value = {this.state.country} onChange={this.changeCountry}>
                                    <option>Select Country</option>
                                    {this.state.countryData.map(country => {
                                        return (
                                            <option value = {country}> {country} </option>
                                        )
                                        })}
                                </select>
                                <Button style={{marginTop:"20px"}} variant="danger" onClick={this.create}>Create Simulation</Button>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
                </CardDeck>
                <CardDeck style={{marginTop:"20px", marginLeft:"10px", marginRight:"10px"}}>
                    <Card border = "danger" style={{width: '25rem'}}>
                        <Card.Body>
                            <Card.Title>Add New Data Points to a Simulation</Card.Title>
                            <Card.Text>
                                <Form>
                                    <select style ={{marginTop: "20px"}} class="form-control" id="exampleFormControlSelect1" value = {this.state.simID} onClick={this.getAllSimName}  onChange={this.changeSimId}>
                                        <option>Select Simulation</option>
                                        {this.state.simulationNameList.map(sim => {
                                            return (
                                                <option value = {sim}> {sim} </option>
                                            )
                                            })}
                                    </select>
                                    <Form.Label style={{marginTop:"20px"}}>Enter Year</Form.Label>
                                    <Form.Control type="number" placeholder = "Year" value={this.state.year} onChange={this.changeYear}/>
                                    <Form.Label style={{marginTop:"20px"}}>Enter CO2 Emissions</Form.Label>
                                    <Form.Control type="number" placeholder = "CO2 Emissions" value={this.state.co2} onChange={this.changeCo2}/>
                                    <Button style={{marginTop:"20px"}} variant="danger" onClick={this.addNewDataPoint}>Add Data Point</Button>
                                </Form>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                <Card  border = "danger" style={{width: '25rem' }}>
                    <Card.Body>
                        <Card.Title>Update Data Points</Card.Title>
                        <Card.Text>
                            <Form>
                                    <select style ={{marginTop: "20px"}} class="form-control" id="exampleFormControlSelect1" value = {this.state.simID} onClick={this.getAllSimName}  onChange={this.changeSimId}>
                                        <option>Select Simulation</option>
                                        {this.state.simulationNameList.map(sim => {
                                            return (
                                                <option value = {sim}> {sim} </option>
                                            )
                                            })}
                                    </select>
                                    <select style ={{marginTop: "20px"}} class="form-control" id="exampleFormControlSelect1" value = {this.state.year} onClick={this.getYearData}  onChange={this.changeYear}>
                                        <option>Select Year</option>
                                        {this.state.yearList.map(year => {
                                            return (
                                                <option value = {year}> {year} </option>
                                            )
                                            })}
                                    </select>
                                <Form.Label style={{marginTop:"20px"}}>Enter New CO2 Emissions</Form.Label>
                                <Form.Control type="number" placeholder = "CO2 Emissions" value={this.state.co2} onChange={this.changeCo2}/>
                                <Button style={{marginTop:"20px"}} variant="danger" onClick={this.update}>Update Data Points</Button>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card  border = "danger" style={{width: '25rem' }}>
                    <Card.Body>
                        <Card.Title>Delete a Simulation</Card.Title>
                        <Card.Text>
                            <Form>
                                <select style ={{marginTop: "20px"}} class="form-control" id="exampleFormControlSelect1" value = {this.state.simID} onClick={this.getAllSimName}  onChange={this.changeSimId}>
                                        <option>Select Simulation to Delete</option>
                                        {this.state.simulationNameList.map(sim => {
                                            return (
                                                <option value = {sim}> {sim} </option>
                                            )
                                            })}
                                    </select>
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
                                <select style ={{marginTop: "20px"}} class="form-control" id="exampleFormControlSelect1" value = {this.state.simID} onClick={this.getAllSimName}  onChange={this.changeSimId}>
                                        <option>Select Simulation To View</option>
                                        {this.state.simulationNameList.map(sim => {
                                            return (
                                                <option value = {sim}> {sim} </option>
                                            )
                                            })}
                                    </select>
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
                                <Button style ={{marginTop:"20px"}} variant="danger">Run Simulation</Button>
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
