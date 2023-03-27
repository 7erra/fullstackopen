import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
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


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, update }
