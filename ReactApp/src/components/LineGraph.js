import React, { useEffect, useState } from 'react';
import './Simulation.css'
import 'bootstrap/dist/css/bootstrap.css';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryScatter, VictoryTooltip, VictoryVoronoiContainer, VictoryLegend } from 'victory'



class LineGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        var data = this.props.data
        if (Object.keys(data).length != 0) {

            var existingData = data['ExistingData']
            var userInput = data['UserInput']
            var linModel = data['LinModel']
            var expModel = data['ExpModel']
            var lstmModel = data['lstmModel']
            console.log(expModel)
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
                <VictoryLegend x={125} y={10}
                    orientation="horizontal"
                    gutter={20}
                    style={{ border: { stroke: "white" }, title: {fontSize: 12 } }}
                    data={[
                        { name: "Historical", labels: { fill: "white", fontSize: 12 } , symbol: { size: 2, fill: "cornflowerblue" } },
                        { name: "User data", labels: { fill: "white", fontSize: 12 }, symbol: {  size: 2, fill: "tomato" } },
                        { name: "Lin prediction", labels: { fill: "white", fontSize: 12 }, symbol: {  size: 2, fill: "gold" } },
                        { name: "Exp prediction", labels: { fill: "white", fontSize: 12 }, symbol: {  size: 2, fill: "turquoise" } },
                        { name: "LSTM prediction", labels: { fill: "white", fontSize: 12 }, symbol: {  size: 2, fill: "violet" } }
                    ]}
                />)}
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
                    labels={({ datum }) => [`x: ${datum.x}`, `y: ${datum.y}`]}
                    labels={({ datum }) => [`Year: ${datum.Year}`, `CO2: ${Math.round(datum.CO2Emissions/1000000)}M`]}
                    labelComponent={<VictoryTooltip style={{fontSize: '8px'}}/>}
                />)}
                {Object.keys(data).length != 0 && (
                <VictoryLine
                    data={expModel} 
                    style={{
                        data: {
                            stroke: "turquoise"
                        }
                    }}
                    x='Year' 
                    y='CO2Emissions'
                    labels={({ datum }) => [`x: ${datum.x}`, `y: ${datum.y}`]}
                    labels={({ datum }) => [`Year: ${datum.Year}`, `CO2: ${Math.round(datum.CO2Emissions/1000000)}M`]}
                    labelComponent={<VictoryTooltip style={{fontSize: '8px'}}/>}
                />)}
                {Object.keys(data).length != 0 && (
                <VictoryLine
                    data={lstmModel} 
                    style={{
                        data: {
                            stroke: "violet"
                        }
                    }}
                    size = {2}
                    x='Year' 
                    y='CO2Emissions'
                    labels={({ datum }) => [`x: ${datum.x}`, `y: ${datum.y}`]}
                    labels={({ datum }) => [`Year: ${datum.Year}`, `CO2: ${Math.round(datum.CO2Emissions/1000000)}M`]}
                    labelComponent={<VictoryTooltip style={{fontSize: '8px'}}/>}
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