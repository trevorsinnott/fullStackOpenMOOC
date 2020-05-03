import React from "react";

const Persons = ({ peopleToShow, deletePerson }) => {
  return (
    <table>
      <tbody>
        {peopleToShow.map((person) => (
          <tr key={person.name}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
              <button onClick={() => deletePerson(person.id)}>delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Persons;
