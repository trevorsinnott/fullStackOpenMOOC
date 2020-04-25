import React, { useState } from "react";
import ReactDOM from "react-dom";

const SectionTitle = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ text, count }) => (
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

  const all = () => {
    const total = good + neutral + bad;
    return total;
  };

  const average = () => {
    const average = (good - bad) / all();
    if (isNaN(average)) {
      return 0;
    }
    return average;
  };

  const positive = () => {
    const value = (good / (good + bad + neutral)) * 100;
    if (isNaN(value)) {
      return 0;
    }
    return value + " %";
  };

  return (
    <div>
      <SectionTitle text="give feedback" />
      <Button handleClick={handleGoodClicks} text="good" />
      <Button handleClick={handleNeutralClicks} text="neutral" />
      <Button handleClick={handleBadClicks} text="bad" />
      <SectionTitle text="statistics" />
      <Statistics text="good" count={good} />
      <Statistics text="neutral" count={neutral} />
      <Statistics text="bad" count={bad} />
      <Statistics text="all" count={all()} />
      <Statistics text="average" count={average()} />
      <Statistics text="positive" count={positive()} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
