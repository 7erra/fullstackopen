const Course = ({ courses }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(c => <CoursePart course={c} key={c.id} />)}
    </div>
  )
}

const CoursePart = ({ course }) => {
  let { name, parts } = course
  return (
    <div>
      <Header name={name}/>
      <Content parts={parts}/>
    </div>
  )
}

const Header = ({ name }) => {
  return (
    <h2>{name}</h2>
  )
}

const Content = ({ parts }) => {
  let total = parts
    .map(x => x.exercises)
    .reduce((a, b) => a + b, 0)

  return (
    <div>
      {parts.map(({ name, exercises, id }) => <p key={id}>{name} {exercises}</p>)}
      <p><b>total of {total} exercises</b></p>
    </div>

  )
}

const Part = ({ name, exercises }) => {
  return <div>{name} {exercises}</div>
}

export default Course
