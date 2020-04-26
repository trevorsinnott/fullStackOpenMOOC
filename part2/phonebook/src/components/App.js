import React, { useState } from "react";
import Header from "./Header";
import Input from "./Input";

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
      <Header text="Phonebook" />
      <Input
        text="filter shown with"
        value={filterBy.searchValue}
        handleChange={handleFilterChange}
      />
      <Header text="add a new" />
      <form onSubmit={addPerson}>
        <Input
          text="name:"
          value={newPerson.name}
          handleChange={handlePersonChange}
        />
        <Input
          text="number:"
          value={newPerson.number}
          handleChange={handlePersonChange}
        />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Header text="Numbers" />
      <table>
        <tbody>
          {peopleToShow.map((person) => (
            <tr key={person.name}>
              <td>{person.name}</td>
              <td>{person.number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
