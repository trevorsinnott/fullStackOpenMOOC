import React from "react";
import Input from "./Input";

const PersonForm = ({ newPerson, handleChange, submit }) => {
  const inputs = Object.keys(newPerson).map((label) => {
    return (
      <Input
        key={label}
        value={newPerson[label]}
        text={label}
        handleChange={handleChange}
      />
    );
  });

  return (
    <form onSubmit={submit}>
      {inputs}
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
