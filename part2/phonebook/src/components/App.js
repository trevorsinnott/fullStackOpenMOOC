import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personService from "../services/persons";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });
  const [filterBy, setFilterBy] = useState({ showAll: true, searchValue: "" });
  const [changeMessage, setChangeMessage] = useState({
    error: false,
    text: "",
  });

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
      if (
        window.confirm(
          `${newPerson.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find(
          (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
        );
        const updatedPerson = { ...person, number: newPerson.number };
        personService
          .update(person.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === returnedPerson.id ? returnedPerson : person
              )
            );
            setNewPerson({ name: "", number: "" });
            setChangeMessage({
              ...changeMessage,
              text: `Updated ${returnedPerson.name}'s number`,
            });
            setTimeout(() => {
              setChangeMessage({ ...changeMessage, text: "" });
            }, 5000);
          })
          .catch((returnedPerson) => {
            setChangeMessage({
              error: true,
              text: `Information for ${updatedPerson.name} has already been removed from server`,
            });
            setTimeout(() => {
              setChangeMessage({ error: false, text: "" });
            }, 5000);
          });
      }
    } else {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewPerson({ name: "", number: "" });
        setChangeMessage({
          ...changeMessage,
          text: `Added ${returnedPerson.name}`,
        });
        setTimeout(() => {
          setChangeMessage({ ...changeMessage, text: "" });
        }, 5000);
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
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setChangeMessage({
          ...setChangeMessage,
          text: `Deleted ${persons.find((person) => person.id === id).name}`,
        });
        setTimeout(() => {
          setChangeMessage({ ...changeMessage, text: "" });
        }, 5000);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={changeMessage} />
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
