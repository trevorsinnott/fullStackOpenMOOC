import React from "react";
import Input from "./Input";

const Filter = ({ value, handleChange }) => {
  return (
    <div>
      <Input
        text="filter shown with"
        value={value}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Filter;
