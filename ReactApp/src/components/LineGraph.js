import React, { useEffect, useState } from 'react';
import './Simulation.css'
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import { csv } from 'd3-fetch'
import { VictoryLine, VictoryChart, VictoryAxis, VictoryScatter, VictoryTooltip, VictoryVoronoiContainer } from 'victory'
import { color } from 'd3';
import ls from 'local-storage'


class LineGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    // filterData = (data, country) => {
    //     const d = [];
    //     for(var i=0; i<data.length; i++){
    //         if (data[i]['Code'] == country) {
    //             d.push({"Year": data[i]['Year'], "Emissions": data[i]['Annual CO2 emissions']*1000000});
    //         }
    //     }
    //     return d;
    // }

    scaleData = (data) => {
        for(var i=0; i<data.length; i++){
            data[i]["CO2Emissions"] *= 1000000
        }
        return data;
    }

    render() {
        // const [data, setData] = useState([]);
        // useEffect(() => {
        //     csv('./data/annual-co2-emissions-per-country.csv').then((data) => {
        //         setData(data);
        //     });
        // }, []);
        var data = this.props.data
        if (Object.keys(data).length != 0) {
            var existingData = data['ExistingData']
            // var userInput = this.scaleData(data['UserInput'])
            var userInput = data['UserInput']
            console.log(userInput)
            var linModel = data['LinModel']
            var expModel = data['ExpModel']
        }

        return (
            <div>
            <VictoryChart
                width='1000'
                height='500'
                domainPadding={40}
                padding={{ top: 10, bottom: 40, left: 80, right: 40 }}
                containerComponent={<VictoryVoronoiContainer/>}
            >   
                {Object.keys(data).length != 0 && (
                <VictoryScatter 
                    data={userInput} 
                    style={{
                        data: {
                            fill: "tomato"
                        }
                    }}
                    x='Year' 
                    y='CO2Emissions'
                    // labels={({ datum }) => [`x: ${datum.x}`, `y: ${datum.y}`]}
                    labels={({ datum }) => [`Year: ${datum.Year}`, `CO2: ${Math.round(datum.CO2Emissions/1000000)}M`]}
                    labelComponent={<VictoryTooltip style={{fontSize: '8px'}}/>}
                    size={({ active }) => active ? 5 : 2}
                />
                )}
                {Object.keys(data).length != 0 && (
                <VictoryScatter 
                    data={existingData} 
                    style={{
                        data: {
                            fill: "cornflowerblue"
                        }
                    }}
                    x='Year' 
                    y='CO2Emissions'
                    // labels={({ datum }) => [`x: ${datum.x}`, `y: ${datum.y}`]}
                    labels={({ datum }) => [`Year: ${datum.Year}`, `CO2: ${Math.round(datum.CO2Emissions/1000000)}M`]}
                    labelComponent={<VictoryTooltip style={{fontSize: '8px'}}/>}
                    size={({ active }) => active ? 5 : 2}
                />
                )}
                {Object.keys(data).length != 0 && (
                <VictoryLine
                    data={linModel} 
                    style={{
                        data: {
                            stroke: "gold"
                        }
                    }}
                    x='Year' 
                    y='CO2Emissions'
                    // labels={({ datum }) => [`x: ${datum.x}`, `y: ${datum.y}`]}
                    // labels={({ datum }) => [`Year: ${datum.Year}`, `CO2: ${Math.round(datum.Emissions/1000000)}M`]}
                    // labelComponent={<VictoryTooltip style={{fontSize: '8px'}}/>}
                    // size={({ active }) => active ? 2 : 1}
                />)}
                {Object.keys(data).length != 0 && (
                <VictoryAxis
                    label="Year"
                    tickCount={30}
                    tickFormat={(t) => `${Math.round(t)}`}
                    style={{
                        axis: {stroke: "white"},
                        axisLabel: {fill: "white"},
                        tickLabels: {fontSize: 10, angle: 45, fill: "white"},
                        grid: {stroke: "white", strokeDasharray: "5, 5", opacity: 0.5}
                    }}
                />)}
                {Object.keys(data).length != 0 && (
                <VictoryAxis
                    dependentAxis={true}
                    label="CO2 Emissions (Tons)"
                    tickCount={30}
                    tickFormat={(t) => `${Math.round(t/1000000)}M`}
                    style={{
                        axis: {stroke: "white"},
                        axisLabel: {fill: "white", padding: 40},
                        tickLabels: {fontSize: 10, angle: -45, fill: "white"},
                        grid: {stroke: "white", strokeDasharray: "5, 5", opacity: 0.5}
                    }}
                />)}
            </VictoryChart>
            </div>
        )
    }
}

export default LineGraph;