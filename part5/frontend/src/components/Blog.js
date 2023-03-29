import { useState } from "react"
// import blogs from "../services/blogs"

const Blog = ({ blog, fRemove, fLike }) => {
  const [visible, setVisible] = useState(false)
  const [localBlog] = useState(blog)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  if (!localBlog) return null
  return (
    <div className="blog" style={blogStyle}>
      <div className="blog-title">{localBlog.title} <button onClick={() => setVisible(!visible)}>{visible ? "Hide" : "View"}</button></div>
      <div className="blog-author">{localBlog.author}</div>
      <div className="blog-url" style={{ display: visible ? "" : "none" }}>{localBlog.url}</div>
      <div className="blog-likes" style={{ display: visible ? "" : "none" }}>{localBlog.likes} <button onClick={fLike}>Like</button></div>
      {fRemove &&
        <button style={{ display: visible ? "" : "none" }} onClick={() => fRemove(blog)}>Remove</button>
      }
    </div>
  )
}

export default Blog
