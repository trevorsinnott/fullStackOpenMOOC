import React from "react";

const Weather = ({ weatherReport }) => {
  const { location, current } = weatherReport;
  return (
    <div>
      <h2>Weather in {location.name}</h2>
      <div>
        <b>temperature: </b>
        {current.temperature} Celcius
      </div>
      <img
        src={current.weather_icons[0]}
        alt={current.weather_descriptions.join()}
        height="75"
      />
      <div>
        <b>wind: </b>
        {current.wind_speed} mph direction {current.wind_dir}
      </div>
    </div>
  );
};

export default Weather;
