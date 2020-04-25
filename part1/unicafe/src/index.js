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

const StatsContainer = ({ count, text }) => {
  if (count.all === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <div>
      <Statistics text={text.good} count={count.good} />
      <Statistics text={text.neutral} count={count.neutral} />
      <Statistics text={text.bad} count={count.bad} />
      <Statistics text={text.all} count={count.all} />
      <Statistics text={text.average} count={count.average} />
      <Statistics text={text.positive} count={count.positive} />
    </div>
  );
};

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

  const count = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all(),
    average: average(),
    positive: positive(),
  };

  const text = {
    good: "good",
    bad: "bad",
    neutral: "neutral",
    all: "all",
    average: "average",
    positive: "positive",
  };

  return (
    <div>
      <SectionTitle text="give feedback" />
      <Button handleClick={handleGoodClicks} text="good" />
      <Button handleClick={handleNeutralClicks} text="neutral" />
      <Button handleClick={handleBadClicks} text="bad" />
      <SectionTitle text="statistics" />
      <StatsContainer count={count} text={text} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
