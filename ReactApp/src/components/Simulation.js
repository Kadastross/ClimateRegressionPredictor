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
import Share from './Share'
import ls from 'local-storage'
import { isoFormat } from 'd3';

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
            runData: {},
            validData: "false",
            userID: "",
            createSimResult: "",
            updateSimResult: "",
            deleteSimResult: "",
            addDataResult: "",
            validInputYears: [],
            validMapYears: [],
            map_year: -1,
            mapData: {},
            validLogin: "",
            successRun: ""
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

    getInputYearDropdown = () => {
        var validYears = []
        for (let i = 2020; i < 2050; i++) {
                validYears.push(i)
        }
        this.setState({validInputYears: validYears})
    }

    getMapYearDropdown = () => {
        var validYears = []
        for (let i = 1800; i <= 2018; i++) {
            validYears.push(i)
        }
        this.setState({validMapYears: validYears})
    }

    getMapData = () => {
        console.log("map")
        var data = {
            "yr": this.state.map_year,
        }
        fetch('http://127.0.0.1:5000/getMapData' , {
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
                this.setState({mapData: data})
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    changeSimId = (e) => {
        this.setState({simID: e.target.value})
    }

    changeYear = (e) => {
        this.setState({year: e.target.value})
    }

    changeMapYear = (e) => {
        this.setState({map_year: e.target.value})
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
        .then(response => response.text())
        .then((data) => {
            if (data === "s") {
                this.setState({addDataResult: "true"})
                setTimeout(function(){
                    this.setState({addDataResult:""});
               }.bind(this),5000);
            }
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
        .then(response => response.text())
        .then((data) => {
                if (data === "s") {
                    this.setState({createSimResult: "true"})
                }
                setTimeout(function(){
                    this.setState({createSimResult:""});
               }.bind(this),5000);
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
        .then(response => response.text())
        .then((data) => {
            if (data === "s") {
                this.setState({updateSimResult: "true"})
                setTimeout(function(){
                    this.setState({updateSimResult:""});
               }.bind(this),5000);
            }
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
            if (data != "") {
                this.setState({viewData: data, validData: "true"})
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    run = () => {
        console.log("run")
        var data = {
            "simName": this.state.simID,
            "username": this.state.userID
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
                this.setState({runData: data, successRun:"true"})
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
        .then(response => response.text())
        .then((data) => {
            if (data === "s") {
                this.setState({deleteSimResult: "true"})
                setTimeout(function(){
                    this.setState({deleteSimResult:""});
               }.bind(this),5000);
            }

        })
        .catch((error) => {
            console.log(error)
        })
    }

    logOut = () => {
        ls.set("validLogin", false)
        this.setState({validLogin: "false"})
    }

    render() {   
        if (this.state.validLogin === "false") {
            return <Redirect to="/" />
        }     
        return (
        <div className="Sim-Background">
            <div class="row">
                <div class="col-sm-10 col-12">
                    <h1 className="block-example border-bottom border-dark" style={{marginLeft:"20px" , color:'white'}}>Welcome {this.state.userID} </h1>
                </div>
                <div class="col-sm-2 col-12">
                    <Button style = {{marginLeft:"50px"}} variant="danger" onClick = {this.logOut}>Log Out</Button>
                </div>
            </div>
            <h1 className="block-example border-bottom border-dark" style={{marginTop:"30px", marginLeft:"20px" , color:'white'}}> Modeling Climate Change</h1>
            <h2 className="block-example border-bottom border-dark" style={{marginTop: "50px", marginLeft:"20px" , color:'white'}}>Heat Map</h2>

            <select style ={{marginTop: "20px", marginLeft:"20px"}} class="form-control" id="exampleFormControlSelect1" value = {this.state.map_year} onClick={this.getMapYearDropdown}  onChange={this.changeMapYear}>
                                        <option>Select Year</option>
                                        {this.state.validMapYears.map(map_year => {
                                            return (
                                                <option value = {map_year}> {map_year} </option>
                                            )
                                            })}
            </select>
            <Button style ={{marginTop:"20px", marginLeft:"20px"}} variant="danger" onClick={this.getMapData}>View Map</Button>
            <HeatMap yr={this.state.map_year} map_data={this.state.mapData}></HeatMap>

            <h2 className="block-example border-bottom border-dark" style={{marginTop: "50px", marginLeft:"20px" , color:'white'}}>Co2 Emissions Graph</h2>
            <LineGraph data={this.state.runData}></LineGraph>
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
                                {this.state.createSimResult === "true" && 
                                    <Card.Text style={{marginTop:"20px"}}>Simulation Created Successfully</Card.Text>
                                }
                                {this.state.createSimResult === "false" && 
                                    <Card.Text style={{marginTop:"20px"}}>There was an error.</Card.Text>
                                }
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
                                    <select style ={{marginTop: "20px"}} class="form-control" id="exampleFormControlSelect1" value = {this.state.year} onClick={this.getInputYearDropdown}  onChange={this.changeYear}>
                                        <option>Select Year</option>
                                        {this.state.validInputYears.map(year => {
                                            return (
                                                <option value = {year}> {year} </option>
                                            )
                                            })}
                                    </select>
                                    <Form.Label style={{marginTop:"20px"}}>Enter CO2 Emissions (Millions of Tons)</Form.Label>
                                    <Form.Control type="number" placeholder = "CO2 Emissions" value={this.state.co2} onChange={this.changeCo2}/>
                                    <Button style={{marginTop:"20px"}} variant="danger" onClick={this.addNewDataPoint}>Add Data Point</Button>
                                    {this.state.addDataResult === "true" && 
                                    <Card.Text style={{marginTop:"20px"}}>Data Point Added Successfully</Card.Text>
                                    }
                                    {this.state.createSimResult === "false" && 
                                        <Card.Text style={{marginTop:"20px"}}>There was an error.</Card.Text>
                                    }
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
                                <Form.Label style={{marginTop:"20px"}}>Enter New CO2 Emissions (Millions of Tons)</Form.Label>
                                <Form.Control type="number" placeholder = "CO2 Emissions" value={this.state.co2} onChange={this.changeCo2}/>
                                <Button style={{marginTop:"20px"}} variant="danger" onClick={this.update}>Update Data Points</Button>
                                {this.state.updateSimResult === "true" && 
                                    <Card.Text style={{marginTop:"20px"}}>Data Point Updated Successfully</Card.Text>
                                }
                                {this.state.createSimResult === "false" && 
                                    <Card.Text style={{marginTop:"20px"}}>There was an error.</Card.Text>
                                }
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
                                {this.state.deleteSimResult === "true" && 
                                    <Card.Text style={{marginTop:"20px"}}>Simulation Deleted Successfully</Card.Text>
                                }
                                {this.state.createSimResult === "false" && 
                                    <Card.Text style={{marginTop:"20px"}}>There was an error.</Card.Text>
                                }
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
                                <Button style ={{marginTop:"20px", marginLeft:"7px"}} variant="danger" onClick={this.run}>Run Simulation</Button>
                                {this.state.validData === "true" &&
                                <Card.Text style={{marginTop:"20px"}}>
                                        <Card.Text>Country: {this.state.viewData[0][0]}</Card.Text>
                                        {this.state.viewData.map(sim => {
                                            return (
                                                <Card.Text>
                                                    Year: {sim[1]}, 
                                                    CO2 Emissions : {sim[2]} mTons
                                                </Card.Text>
                                                
                                            )
                                            })}
                                </Card.Text>
                                }
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
                </CardDeck>
                {this.state.successRun=="true" &&
                    <div>
                    <h2 className="block-example border-bottom border-dark" style={{marginTop: "50px", marginLeft:"20px" , color:'white'}}>Co2 Emissions Graph</h2>
                    <LineGraph data={this.state.runData}></LineGraph>
                    </div>
                }
                <Share />
                <h1 style={{color:"black"}}>xyz</h1>
        </div>
        )
    }
}


export default Simulation;
