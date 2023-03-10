import { useState } from 'react'

const Button = ({ name, fnc }) => {
  return (
    <button onClick={fnc}>{name}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ feedback }) => {
  let good, neutral, bad;
  [good, neutral, bad] = feedback;
  let all = feedback.reduce((x, y) => {
    return x + y
  }, 0)
  if (all === 0) {
    return <p>No feedback given</p>
  }
  let average = (good - bad) / all || 0;
  let positive = (good / all || 0) * 100;
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive.toString() + "%"} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button name="good" fnc={() => setGood(good + 1)} />
        <Button name="neutral" fnc={() => setNeutral(neutral + 1)} />
        <Button name="bad" fnc={() => setBad(bad + 1)} />
      </div>
      <h1>statistics</h1>
      <Statistics feedback={[good, neutral, bad]} />
    </div>
  )
}

export default App
