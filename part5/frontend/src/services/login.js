import axios from "axios"
const url = "/api/login"

async function login(credentials) {
  const response = await axios.post(url, credentials)
  return response.data
}

export default {
  login
}
