import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const randomInt = (max) => Math.floor(Math.random() * Math.floor(max))

const RandomAnecdote = ({anecdote, votes}) => {

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const BestAnecdote = ({anecdote, votes}) => {
  
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(randomInt(anecdotes.length));
  const [voted, setVoted] = useState(Array(anecdotes.length).fill(0));
  const [maxVotesIndex, setMaxVotesIndex] = useState(0);

  const onVoteClicked = () => {
    console.log(`Add 1 vote for anecdote ${selected}.`)
    const updatedVotes = [...voted];
    updatedVotes[selected] += 1;
    setVoted(updatedVotes);
    setMaxVotesIndex(updatedVotes.indexOf(Math.max(...updatedVotes)));
    console.log(`New best anecdote: ${maxVotesIndex}.`);
  }

  const onNextClicked = () => {
    console.log('Chossing a random anecdote.')
    setSelected(randomInt(anecdotes.length));
  }

  return (
    <div>
      <RandomAnecdote anecdote={anecdotes[selected]} votes={voted[selected]} />
      <button onClick={onVoteClicked}>vote</button>
      <button onClick={onNextClicked}>next anecdote</button>
      <BestAnecdote anecdote={anecdotes[maxVotesIndex]} votes={voted[maxVotesIndex]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)