import React, { useEffect, useState } from 'react';
import './Simulation.css'
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import { csv } from 'd3-fetch'
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory'
import { color } from 'd3';

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
        var d = filterData(data, "USA");
        console.log(d)
    }
    return (
        <div>

        
        <h1>Carbon Emissions </h1>
        <VictoryChart
            // style={{
            //     tickLabels: {fontSize: 100}
            // }}
            width='900'
            height='500'
            domainPadding={50}
            padding={{ top: 10, bottom: 40, left: 80, right: 10 }}
        >
        {data.length > 0 &&(
        <VictoryAxis
            tickCount={d.length/4}
            style={{
                tickLabels: {fontSize: 10, angle: 45},
                grid: {
                    stroke: "lightgrey"
                },
                color: "white"
            }}
        />)}
        {data.length > 0 &&(
        <VictoryAxis
            dependentAxis={true}
            // tickFormat={(t) => `${Math.round(t)}%`}
            tickCount={d.length/10}
            style={{
                tickLabels: {fontSize: 10, angle: -45},
                grid: {
                    stroke: "lightgrey"
                }
            }}
        />)}
        
        {data.length > 0 &&(
            <VictoryLine 
                data={d} 
                style={{
                    data: {
                      stroke: "#02B875"
                    }
                  }}
                x='Year' 
                y='Emissions' 
            />)}
        </VictoryChart>
        </div>
    )
}

export default LineGraph;