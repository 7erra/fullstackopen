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

async function create(blog) {
  const response = await axios.post(baseUrl, blog, {
    headers: { Authorization: token }
  })
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken }
