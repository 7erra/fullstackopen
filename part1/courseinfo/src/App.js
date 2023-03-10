const Header = (props) => <h1>{props.name}</h1>
const Content = (props) => (
  <div>
    <Part number={props.parts[0][0]} exercises={props.parts[0][1]} />
    <Part number={props.parts[1][0]} exercises={props.parts[1][1]} />
    <Part number={props.parts[2][0]} exercises={props.parts[2][1]} />
  </div>
)
const Part = (props) => <p>{props.number} {props.exercises}</p>
const Total = (props) => <p>Number of exercises {props.count}</p>

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course} />
      <Content parts={[[part1, exercises1], [part2, exercises2], [part3, exercises3]]} />
      <Total count={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App
