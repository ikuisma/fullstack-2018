import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getConfig = () => {
  return {
    headers: { 'Authorization': token }
  }
}

const getBlogUrl = (blog) => (`${baseUrl}/${blog._id}`)

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfig())
  console.log(response.data)
  return response.data
}

const update = async (blog) => {
  const url = getBlogUrl(blog)
  const response = await axios.put(url, blog, getConfig())
  return response.data
}

const destroy = async (blog) => {
  const url = getBlogUrl(blog)
  const response = await axios.delete(url, getConfig())
  return response.data
}

export default { getAll, setToken, create, update, destroy }