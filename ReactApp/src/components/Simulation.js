import React from 'react';
import './Simulation.css'
// import {useEffect} from "react" 


class Simulation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            simID: -1,
            year: -1,
            co2: -1,
            simIDFound: true,
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
            "simID":this.state.simID,
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
        return (
        <div style= {{color: 'white'}}>
            <h1 style= {{color: 'white'}} >Search Your Simulations</h1>
            <h2>Create/Update a Simulation</h2>
            <div style={{marginTop:"10px"}}> <label style= {{color: 'white'}}>Enter a Simulation ID (must be a number >= 0)</label> </div>
            <div style={{marginTop:"10px"}}><input name="simID" value={this.state.simID} onChange={this.changeSimId} type="number" /></div>

            <div style={{marginTop:"10px"}}> <label style= {{color: 'white'}}>Year</label> </div>
            <div style={{marginTop:"10px"}}><input name="year" value={this.state.year} onChange={this.changeYear} type="number" /> </div>
            <div style={{marginTop:"10px"}}><label style= {{color: 'white'}}>CO2 Emissions</label></div>
            <div style={{marginTop:"10px"}}><input name="co2" value={this.state.co2} onChange={this.changeCo2} type="number" /> </div>
            <div style={{marginTop:"10px"}}>
                <button style={{marginRight:"10px"}} onClick={this.create}>Create</button>
                <button onClick={this.update}>Update</button>
            </div>
            
            
            <h2>View/Delete a Simulation</h2>
            <div><label style= {{color: 'white'}}> Enter the SimulationID of the Simulation to View </label></div>
            <div style={{marginTop:"10px"}}><input name="simID" value={this.state.simID} onChange={this.changeSimId} type="number" /></div>
            <div style={{marginTop:"10px"}}>
                <button style = {{marginRight:"10px"}} onClick={this.view}>View</button>
                <button onClick={this.delete}>Delete</button>
            </div>
            {this.state.simIDFound === false &&
            <h3>There is no corresponding simulationID to View/Delete.</h3>
            }
        </div>
        )
    }
}


export default Simulation;