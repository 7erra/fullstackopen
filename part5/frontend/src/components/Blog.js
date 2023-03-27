import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={() => setVisible(!visible)}>{visible ? "Hide" : "View"}</button>
      <div style={{ display: visible ? "" : "none" }}>
        {blog.author}<br />
        {blog.url}<br />
        {blog.likes} <button>Like</button><br />
        {blog.author}
      </div>
    </div>
  )
}

export default Blog
