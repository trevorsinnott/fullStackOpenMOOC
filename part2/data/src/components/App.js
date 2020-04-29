import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterBy, setFilterBy] = useState({
    none: true,
    value: "",
  });

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    const newFilter = { ...filterBy };
    if (event.target.value === "") {
      newFilter.none = true;
    } else {
      newFilter.none = false;
    }
    newFilter.value = event.target.value;
    setFilterBy(newFilter);
  };

  const countriesToShow = filterBy.none
    ? []
    : countries.filter((country) =>
        country.name.toLowerCase().includes(filterBy.value.toLowerCase())
      );

  const results = filterBy.none ? (
    <div></div>
  ) : countriesToShow.length > 10 ? (
    <div>Too many matches, specify another filter</div>
  ) : countriesToShow.length > 1 ? (
    countriesToShow.map((country) => {
      return <div key={country.name}>{country.name}</div>;
    })
  ) : (
    countriesToShow.map((country) => {
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
