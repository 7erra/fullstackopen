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
const Total = (props) => {
  let count = props.parts.map((item) => {
    return item.exercises
  }).reduce((x, y) => {
      return x+y
    }, 0)
  return <p>Number of exercises {count}</p>
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
