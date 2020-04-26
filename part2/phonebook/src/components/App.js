import React, { useState } from "react";
import Header from "./Header";
import Input from "./Input";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });

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

  return (
    <div>
      <Header text="Phonebook" />
      <form onSubmit={addPerson}>
        <Input
          text="name"
          value={newPerson.name}
          handleChange={handlePersonChange}
        />
        <Input
          text="number"
          value={newPerson.number}
          handleChange={handlePersonChange}
        />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Header text="Numbers" />
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
