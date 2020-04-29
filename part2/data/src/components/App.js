import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterBy, setFilterBy] = useState({
    none: true,
    value: "",
    results: [],
  });

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    const newFilter = { ...filterBy };
    newFilter.results = [];
    if (event.target.value === "") {
      newFilter.none = true;
    } else {
      newFilter.none = false;
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

  const results = filterBy.none ? (
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
    filterBy.results.map((country) => {
      return <Country key={country.name} country={country} />;
    })
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
