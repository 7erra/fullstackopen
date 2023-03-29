import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import Message from "./components/Message"
import Toggleable from "./components/Toggleable"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
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
    async function getBlogs() {
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((b1, b2) => b2.likes - b1.likes))
    }
    getBlogs()

    const storedUser = window.localStorage.getItem("user")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  function logOut() {
    setUser(null)
    window.localStorage.removeItem("user")
  }

  const blogFormRef = useRef()
  async function addBlog(blogObject) {
    const createdBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(createdBlog))
    if (blogFormRef.current) {
      blogFormRef.current.toggleVisibility()
    }
  }

  async function removeBlog(blogObject) {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)) {
      await blogService.remove(blogObject)
      setBlogs(blogs.filter(b => b.id !== blogObject.id))
    }
  }

  async function likeBlog(blog) {
    const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    console.log(likedBlog)
    await blogService.update(likedBlog)
  }

  return (
    <div>
      <h1>Blogs App</h1>
      <Message content={message} setMessage={setMessage} />
      {!user &&
        <Toggleable buttonLabel="Login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target: { value } }) => setUsername(value)}
            handlePasswordChange={({ target: { value } }) => setPassword(value)}
            handleSubmit={handleLogin}
          />
        </Toggleable>
      }
      {user &&
        <div>
          <div>{user.name} logged in <button onClick={logOut}>Log Out</button></div>
          <Toggleable buttonLabel="New Blog">
            <BlogForm createBlog={addBlog} />
          </Toggleable>
        </div>
      }
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} fLike={() => { likeBlog(blog) }} fRemove={blog.user && blog.user.id === user.id ? removeBlog : undefined} />
      )}
    </div>
  )
}

export default App
