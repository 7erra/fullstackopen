import axios from "axios"
const baseUrl = "/api/blogs"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

let token = null
function setToken(newToken) {
  token = `Bearer ${newToken}`
}

const header = () => ({ headers: { Authorization: token } })

async function create(blog) {
  const response = await axios.post(baseUrl, blog, header())
  return response.data
}

async function update(blog) {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, header())
  return response.data
}

async function remove(blog) {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, header())
  return response
}

export default { getAll, create, setToken, update, remove }
