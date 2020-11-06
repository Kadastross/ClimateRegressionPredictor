import React from 'react';
import './Simulation.css'

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
    }

    update = () => {
        console.log("update")
    }
    view = () => {
        console.log("view")
    }

    delete = () => {
        console.log("delete")
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