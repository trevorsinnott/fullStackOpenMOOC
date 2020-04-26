import React from "react";

const Input = ({ text, value, handleChange }) => {
  return (
    <div>
      {text} <input id={text} value={value} onChange={handleChange} />
    </div>
  );
};

export default Input;
