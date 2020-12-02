import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  .domain([0, 10000])
  .range(["#ffcccc", "#ff0000"]);
  
  const HeatMap = (props) => {
    //super(props);
    console.log(props.yr);
    //const [data, setData] = useState([]);
    useEffect(() => {
        ReactTooltip.rebuild();
    });
    
    // useEffect(() => {
      
    //     setData(props.map_data);
      
    // }, []);

    var data = props.map_data;
    console.log(props.map_data);
    var info = "hi";

    return (
        <div>
            <h4 style={{marginLeft:"20px", color:"white"}}>Click on the countries to see their total CO2 emissions in millions of tons</h4>
            {/* <ReactTooltip />    */}
    <h2 style={{marginLeft:"20px",color:"red"}}> Year {props.yr} </h2>
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 130
        }}
        width={800}
  height={400}
  style={{ width: "100%", height: "auto" }} 
      >
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        {data.length > 0 && (
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = data.find((s) => s[0] === geo.properties.ISO_A3) ; //&& s.Year === props.yr
                console.log(d? d[1] : "non")
                return (
                    
                  <Geography
                    key={geo.rsmKey}

                    data-tip={`${
                        d ? d[0] : "Not Recorded"
                      } ${d ? Number(d[1]).toFixed(2) : ""}`}

                      style={{
                        hover: {
                            fill: "#607D8B",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none"
                          }
                      }}
                    geography={geo}
                    
                    fill={d ? colorScale(d[1]) : "#F5F4F6"}
                    onClick={() => {
                        info = d ? d[0] : "Not Recorded";
                        alert(d ? info + ": " + Number(d[0]) + " million Tons of CO2": "Not Recorded");
                    }}
                  />
                  
                );
            
              })
            }
            </Geographies>
            )}
        </ComposableMap>
        
    </div>
      
    );
  };
  
  export default HeatMap;