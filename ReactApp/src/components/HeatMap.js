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

  const HeatMap = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      csv('./data/annual-co2-emissions-per-country.csv').then((data) => {
        setData(data);
      });
    }, []);

    console.log(data);
    

    return (
        <div>
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
                const d = data.find((s) => s.Code === geo.properties.ISO_A3 && s.Year === "1970") ;
                return (
                  <Geography
                    key={geo.rsmKey}
                    data-tip={`${
                        geo.properties.ISO_A3
                      } ${geo.properties.ISO_A3}`}
                    geography={geo}
                    // data-tip={`${
                    //     d ? d["Entity"] : "Not Recorded"
                    //   } ${d ? d["Annual CO2 emissions"] : "Not Recorded"}`}
                      style={{
                        
                        hover: {
                            fill: "#607D8B",
                            stroke: "#607D8B",
                            strokeWidth: 0.75,
                            outline: "none"
                          }
                        
                      }}
                    fill={d ? colorScale(d["Annual CO2 emissions"]) : "#F5F4F6"}
                    onClick={() => d ? console.log(d["Entity"]) : console.log("Not Recorded")}
                  />
                );
              })
            }
          </Geographies>
        )}
      </ComposableMap>
      <ReactTooltip></ReactTooltip>
      </div>
    );
  };
  
  export default HeatMap;