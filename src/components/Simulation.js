import React from 'react';
import './Simulation.css'

class Simulation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            simID: -1
        }
    }

    changeSimId = (e) => {
        this.setState({simID: e.target.value})
    }
    render() {
        return (
        <div style= {{color: 'white'}}>
            <h1 style= {{color: 'white'}} >Search Your Simulations</h1>
            <h2>Create a Simulation</h2>
            <form>
                <div>
                <label style= {{color: 'white'}}>
                    Enter a Simulation ID (must be a number >= 0)
                    <input name="simID" value={this.state.simID} onChange={this.changeSimId} type="number" />
                </label>
                </div>
                <div>
                <label style= {{color: 'white'}}>
                    Enter Year to Predict (must be after 2020)
                    <input name="yearPredict" value={this.state.yearPredict} onChange={this.changeYearPredict} type="number" />
                </label>
                </div>
                <div>
                <label style= {{color: 'white'}}>
                    Enter Year to Predict (must be after 2020)
                    <input name="yearPredict" value={this.state.yearPredict} onChange={this.changeYearPredict} type="number" />
                </label>
                <h2>View a Simulation</h2>
                <label style= {{color: 'white'}}>
                    <input name="simID" value={this.state.simID} onChange={this.changeSimId} type="number" />
                </label>
                </div>
                <h2>Delete a Simulation</h2>
                <label style= {{color: 'white'}}>
                    <input name="simID" value={this.state.simID} onChange={this.changeSimId} type="number" />
                </label>
            </form>
        </div>
        )
    }
}

export default Simulation;