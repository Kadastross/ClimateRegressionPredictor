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
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 130
        }}
      >
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        {data.length > 0 && (
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = data.find((s) => s.Code === geo.properties.ISO_A3 && s.Year === "2017") ;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={d ? colorScale(d["Annual CO2 emissions"]) : "#F5F4F6"}
                  />
                );
              })
            }
          </Geographies>
        )}
      </ComposableMap>
    );
  };
  
  export default HeatMap;