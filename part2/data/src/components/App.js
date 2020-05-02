import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterBy, setFilterBy] = useState({
    value: "",
    results: [],
  });
  const [weather, setWeather] = useState({ empty: true });

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    if (filterBy.results.length === 1) {
      const country = filterBy.results[0];
      const targetUrl =
        "http://api.weatherstack.com/current?access_key=" +
        process.env.REACT_APP_WEATHER_KEY +
        "&query=" +
        country.capital;
      axios.get(targetUrl).then((response) => setWeather(response.data));
    }
  }, [filterBy]);

  const handleFilterChange = (event) => {
    const newFilter = { ...filterBy };
    newFilter.results = [];
    if (event.target.value !== "") {
      newFilter.results = countries.filter((country) =>
        country.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
    }
    newFilter.value = event.target.value;
    setFilterBy(newFilter);
  };

  const handleCountryButton = (country) => {
    const newFilter = { ...filterBy, results: [country] };
    setFilterBy(newFilter);
  };

  const results =
    filterBy.results.length === 0 ? (
      <div></div>
    ) : filterBy.results.length > 10 ? (
      <div>Too many matches, specify another filter</div>
    ) : filterBy.results.length > 1 ? (
      filterBy.results.map((country) => {
        return (
          <div key={country.name}>
            {country.name}{" "}
            <button onClick={() => handleCountryButton(country)}>show</button>
          </div>
        );
      })
    ) : (
      <Country
        key={filterBy.results[0].name}
        country={filterBy.results[0]}
        weatherReport={weather}
      />
    );

  return (
    <div>
      find countries{" "}
      <input onChange={handleFilterChange} value={filterBy.value} />
      {results}
    </div>
  );
};

export default App;
