import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Heading = ({ text }) => <h1>{text}</h1>;

const Anecdote = ({ text, score }) => {
  return (
    <div>
      <p>{text}</p>
      <p>has {score} votes</p>
    </div>
  );
};

const App = (props) => {
  const max = props.anecdotes.length;
  const [selected, setSelected] = useState(
    Math.floor(Math.random() * Math.floor(max - 1))
  );
  const [score, setScore] = useState(new Array(max).fill(0));
  const [most, setMost] = useState({ index: -1, score: 0 });

  const handleNext = (max, selected) => {
    let newIndex = selected;

    while (newIndex === selected) {
      newIndex = Math.floor(Math.random() * Math.floor(max - 1));
    }

    setSelected(newIndex);
  };

  const handleVote = (index) => {
    const newScore = [...score];
    newScore[index] += 1;
    if (newScore[index] > most.score) {
      setMost({ index: index, score: newScore[index] });
    }
    setScore(newScore);
  };

  return (
    <div>
      <Heading text="Anecdote of the day" />
      <Anecdote text={props.anecdotes[selected]} score={score[selected]} />
      <Button handleClick={() => handleVote(selected)} text="vote" />
      <Button
        handleClick={() => handleNext(max, selected)}
        text="next anecdote"
      />
      <Heading text="Anecdote with the most votes" />
      <Anecdote text={props.anecdotes[most.index]} score={most.score} />
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
