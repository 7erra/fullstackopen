const BlogField = ({ name, value, fChange }) => {
  const id = `blog${name}`
  return (
    <div>
      <label htmlFor={id}>{name}: </label>
      <input id={id} type="text" value={value} onChange={({ target: { value } }) => fChange(value)} />
    </div>
  )
}

export default BlogField
