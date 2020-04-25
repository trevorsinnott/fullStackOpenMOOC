import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = (props) => {
  const max = props.anecdotes.length - 1;
  const [selected, setSelected] = useState(0);
  const [score, setScore] = useState(new Array(max).fill(0));

  const handleNext = (max, selected) => {
    let newIndex = selected;

    while (newIndex === selected) {
      newIndex = Math.floor(Math.random() * Math.floor(max));
    }

    setSelected(newIndex);
  };

  const handleVote = (index) => {
    const newScore = [...score];
    newScore[index] += 1;
    setScore(newScore);
  };

  return (
    <div>
      <div>{props.anecdotes[selected]}</div>
      <div>has {score[selected]} votes</div>
      <Button handleClick={() => handleVote(selected)} text="vote" />
      <Button
        handleClick={() => handleNext(max, selected)}
        text="next anecdote"
      />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
