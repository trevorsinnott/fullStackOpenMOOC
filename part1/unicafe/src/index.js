import React, { useState } from "react";
import ReactDOM from "react-dom";

const SectionTitle = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Counter = ({ text, count }) => (
  <p>
    {text} {count}
  </p>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClicks = () => setGood(good + 1);
  const handleNeutralClicks = () => setNeutral(neutral + 1);
  const handleBadClicks = () => setBad(bad + 1);

  return (
    <div>
      <SectionTitle text="give feedback" />
      <Button handleClick={handleGoodClicks} text="good" />
      <Button handleClick={handleNeutralClicks} text="neutral" />
      <Button handleClick={handleBadClicks} text="bad" />
      <SectionTitle text="statistics" />
      <Counter text="good" count={good} />
      <Counter text="neutral" count={neutral} />
      <Counter text="bad" count={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
