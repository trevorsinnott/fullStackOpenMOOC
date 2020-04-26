import React from "react";

const Persons = ({ peopleToShow }) => {
  return (
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
  );
};

export default Persons;
