import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personService from "../services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });
  const [filterBy, setFilterBy] = useState({ showAll: true, searchValue: "" });

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

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
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewPerson({ name: "", number: "" });
      });
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

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)));
    }
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
      <Persons peopleToShow={peopleToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
