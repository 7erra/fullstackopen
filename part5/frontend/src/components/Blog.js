import { useState } from "react"
// import blogs from "../services/blogs"

const Blog = ({ blog, fRemove }) => {
  const [visible, setVisible] = useState(false)
  const [localBlog] = useState(blog)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  async function like() {
    // const likedBlog = { ...localBlog, likes: localBlog.likes + 1, user: blog.user.id }
    // const result = await blogs.update(likedBlog)
    // setLocalBlog({ ...result, user: blog.user })
  }

  if (!localBlog) return null
  return (
    <div style={blogStyle}>
      <div className="blog-title">{localBlog.title} <button onClick={() => setVisible(!visible)}>{visible ? "Hide" : "View"}</button></div>
      <div className="blog-author">{localBlog.author}</div>
      <div className="blog-url" style={{ display: visible ? "" : "none" }}>{localBlog.url}</div>
      <div className="blog-likes" style={{ display: visible ? "" : "none" }}>{localBlog.likes} <button onClick={like}>Like</button></div>
      {fRemove &&
        <button style={{ display: visible ? "" : "none" }} onClick={() => fRemove(blog)}>Remove</button>
      }
    </div>
  )
}

export default Blog
