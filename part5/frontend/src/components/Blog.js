import { useState } from "react"
import blogs from "../services/blogs"

const Blog = ({ blog, fRemove }) => {
  const [visible, setVisible] = useState(false)
  const [localBlog, setLocalBlog] = useState(blog)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  async function like() {
    const likedBlog = { ...localBlog, likes: localBlog.likes + 1, user: blog.user.id }
    const result = await blogs.update(likedBlog)
    setLocalBlog({ ...result, user: blog.user })
  }

  if (!localBlog) return null
  return (
    <div style={blogStyle}>
      {localBlog.title} <button onClick={() => setVisible(!visible)}>{visible ? "Hide" : "View"}</button>
      <div style={{ display: visible ? "" : "none" }}>
        {localBlog.url}<br />
        {localBlog.likes} <button onClick={like}>Like</button><br />
        {localBlog.author}<br />
        {fRemove &&
          <button onClick={() => fRemove(blog)}>Remove</button>
        }
      </div>
    </div>
  )
}

export default Blog
