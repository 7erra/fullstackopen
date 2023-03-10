const Header = (props) => <h1>{props.name}</h1>
const Content = (props) => {
  let parts = props.parts
  let p1 = parts[0]
  let p2 = parts[1]
  let p3 = parts[2]
  return (
    <div>
      <Part title={p1.name} exercises={p1.exercises} />
      <Part title={p2.name} exercises={p2.exercises} />
      <Part title={p3.name} exercises={p3.exercises} />
    </div>
  )
}
const Part = (props) => <p>{props.title} {props.exercises}</p>
const Total = (props) => <p>Number of exercises {props.count}</p>

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const parts = [part1, part2, part3]

  return (
    <div>
      <Header name={course} />
      <Content parts={parts} />
      <Total count={parts.map((item) => {
        return item.exercises
      }).reduce((x, y) => {
          return x+y
        }, 0)} />
    </div>
  )
}

export default App
