import React from "react";
import "./weather.css";

const Weather = (props) => {
  return (
    <div className="container">
      <div className="cards">
        <h1>{props.city}</h1>
        <h4 className="symbol">
          <i className={`wi ${props.weatherIcon} display-1`} />
        </h4>
        <h1 className="degree">{props.temp_now}&deg;</h1>
        {minmaxTemp(props.temp_min, props.temp_max)}
        <h4 className="desc">
          {props.description.charAt(0).toUpperCase() +
            props.description.slice(1)}
        </h4>
      </div>
    </div>
  );
};

function minmaxTemp(min, max) {
  return (
    <h3>
      <span className="minmax">{min}&deg;</span>
      <span className="minmax">{max}&deg;</span>
    </h3>
  );
}

export default Weather;
