import React, { useState } from "react";
import Input from "./Input";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });
  const [filterBy, setFilterBy] = useState({ showAll: true, searchValue: "" });

  const addPerson = (event) => {
    event.preventDefault();
    if (
      persons.some(
        (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
      )
    ) {
      window.alert(`${newPerson.name} is already added to phonebook`);
      setNewPerson({ name: "", number: "" });
    } else {
      setPersons(persons.concat(newPerson));
      setNewPerson({ name: "", number: "" });
    }
  };

  const handlePersonChange = (event) => {
    const person = { ...newPerson };
    person[event.target.id] = event.target.value;
    setNewPerson(person);
  };

  const peopleToShow = filterBy.showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filterBy.searchValue.toLowerCase())
      );

  const handleFilterChange = (event) => {
    const newFilter = { ...filterBy };
    if (event.target.value === "") {
      newFilter.showAll = true;
    } else {
      newFilter.showAll = false;
    }
    newFilter.searchValue = event.target.value;
    setFilterBy(newFilter);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterBy.value} handleChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        newPerson={newPerson}
        handleChange={handlePersonChange}
        submit={addPerson}
      />
      <h3>Numbers</h3>
      <Persons peopleToShow={peopleToShow} />
    </div>
  );
};

export default App;
