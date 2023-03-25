import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  async function handleLogin(event) {
    event.preventDefault()
    console.log("logging in with", username, password)
    try {
      const user = await loginService.login({
        username,
        password
      })
      console.log(user)
      setUser(user)
      setUsername("")
      setPassword("")
      window.localStorage.setItem("user", JSON.stringify(user))
    } catch (exception) {
      console.error("Failed to login: ", exception)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )

    const user = window.localStorage.getItem("user")
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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

  return (
    <div>
      <h2>blogs</h2>
      <div>{user.name} logged in <button onClick={logOut}>Log Out</button></div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
