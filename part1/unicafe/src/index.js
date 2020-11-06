import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Statistic = ({text, value, units}) => (
  <tr>
    <td>{text}</td>
    <td>{value} {units}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const total = () => good + neutral + bad;

  if (total() > 0) {
    return (
      <table>
        <tbody>
        <Statistic text='Good' value={good} />
        <Statistic text='Neutral' value={neutral} />
        <Statistic text='Bad' value={bad} />
        <Statistic text='All' value={total()} />
        <Statistic text='Average' value={((good - bad)/total()).toFixed(2)} />
        <Statistic text='Positive' value={(100*good/total()).toFixed(1)} units='%' />
        </tbody>
      </table>
    );
  } else return ( <p>No feedback given</p> );
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onGoodClick = () => setGood(good + 1)
  const onNeutralClick = () => setNeutral(neutral + 1)
  const onBadClick = () => setBad(bad + 1)
  
  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={onGoodClick}>good</button> 
      <button onClick={onNeutralClick}>neutral</button> 
      <button onClick={onBadClick}>bad</button>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

