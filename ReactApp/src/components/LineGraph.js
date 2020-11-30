import React, { useEffect, useState } from 'react';
import './Simulation.css'
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import { csv } from 'd3-fetch'
import { VictoryLine, VictoryChart, VictoryAxis, VictoryScatter } from 'victory'

const filterData = (data, country) => {
    const d = [];
    for(var i=0; i<data.length; i++){
        if (data[i]['Code'] == country) {
            d.push({"Year": data[i]['Year'], "Emissions": data[i]['Annual CO2 emissions']*1000000});
        }
    }
    return d;
}

const LineGraph = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        csv('./data/annual-co2-emissions-per-country.csv').then((data) => {
            setData(data);
        });
    }, []);
    console.log(data)
    if (data.length > 0) {
        var d = filterData(data, "CHN");
        console.log(d)
    }
    return (
        <VictoryChart
            width='900'
            height='500'
            domainPadding={50}
            padding={{ top: 10, bottom: 40, left: 90, right: 10 }}
        >
        {data.length > 0 &&(
        <VictoryAxis
            label="Year"
            tickCount={d.length/4}
            style={{
                axis: {stroke: "white"},
                axisLabel: {fill: "white"},
                tickLabels: {fontSize: 10, angle: 45, fill: "white"},
                grid: {
                    stroke: "lightgrey"
                }
            }}
        />)}
        {data.length > 0 &&(
        <VictoryAxis
            dependentAxis={true}
            label="CO2 Emissions (Tons)"
            tickCount={d.length/10}
            style={{
                axis: {stroke: "white"},
                axisLabel: {fill: "white", padding: 60},
                tickLabels: {fontSize: 10, angle: -45, fill: "white"},
                grid: {
                    stroke: "lightgrey"
                }
            }}
        />)}
        
        {data.length > 0 &&(
            <VictoryScatter 
                data={d} 
                size={2}
                style={{
                    data: {
                      fill: "#02B875"
                    }
                  }}
                x='Year' 
                y='Emissions' 
            />)}
        </VictoryChart>
    )
}

export default LineGraph;