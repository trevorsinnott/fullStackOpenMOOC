import React from "react";
import Weather from "./Weather";

const Country = ({ country, weatherReport }) => {
  const weather = weatherReport.empty ? (
    <div></div>
  ) : (
    <Weather weatherReport={weatherReport} />
  );
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => {
          return <li key={language.name}>{language.name}</li>;
        })}
      </ul>
      <img src={country.flag} alt={`flag of ${country.name}`} height="100" />
      {weather}
    </div>
  );
};

export default Country;
