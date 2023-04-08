import { useState } from "react"
import BlogField from "./BlogField"

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState(null)

  function addBlog(event) {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog(null)
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          <BlogField text="Title" blog={newBlog} prop="title" setNewBlog={setNewBlog} placeholder="Enter title" />
          <BlogField text="Author" blog={newBlog} prop="author" setNewBlog={setNewBlog} placeholder="Enter author" />
          <BlogField text="URL" blog={newBlog} prop="url" setNewBlog={setNewBlog} placeholder="Enter URL" />
        </div>
        <button id="blog-submit" type="submit">Add Blog</button>
      </form>
    </div>
  )
}

export default BlogForm
