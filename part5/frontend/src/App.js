import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogField from './components/BlogField'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState("")
  const [blogAuthor, setBlogAuthor] = useState("")
  const [blogURL, setBlogURL] = useState("")
  const [message, setMessage] = useState(null)

  async function handleLogin(event) {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      setUser(user)
      blogService.setToken(user.token)
      setUsername("")
      setPassword("")
      window.localStorage.setItem("user", JSON.stringify(user))
      setMessage({ text: "Logged in", type: "success" })
    } catch (exception) {
      console.error("Failed to login")
      setMessage({ text: "Wrong username or password!", type: "error" })
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )

    const storedUser = window.localStorage.getItem("user")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Message content={message} setMessage={setMessage} />
        <form onSubmit={handleLogin}>
          <div>Username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target: { value } }) => setUsername(value)}
            />
          </div>
          <div>Password
            <input
              type="text"
              value={password}
              name="Username"
              onChange={({ target: { value } }) => setPassword(value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  function logOut() {
    setUser(null)
    window.localStorage.removeItem("user")
  }

  async function handleSubmitNewBlog(event) {
    event.preventDefault()
    try {
      const responsedata = await blogService.create({ title: blogTitle, author: blogAuthor, url: blogURL })
      setBlogs(blogs.concat(responsedata))
      setMessage({ text: `Added new blog ${responsedata.title} by ${responsedata.author}`, type: "success" })
    } catch (exception) {
      console.error(exception)
      setMessage({ text: `Failed to add new blog. Reason: ${exception.message}`, type: "error" })
    }

  }

  return (
    <div>
      <h2>blogs</h2>
      <Message content={message} setMessage={setMessage} />
      <div>{user.name} logged in <button onClick={logOut}>Log Out</button></div>
      <h2>Create New</h2>
      <form onSubmit={handleSubmitNewBlog}>
        <BlogField name="Title" value={blogTitle} fChange={setBlogTitle} />
        <BlogField name="Author" value={blogAuthor} fChange={setBlogAuthor} />
        <BlogField name="URL" value={blogURL} fChange={setBlogURL} />
        <button type="submit">Create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
