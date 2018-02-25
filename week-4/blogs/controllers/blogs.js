const blogsRouter = require('express').Router()
const Blog = require('../model/blog')
const User = require('../model/user')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
    response.json(blogs)
  } catch (exception) {
    console.log(exception)
    response.status(500).send({error: 'Server error. '})
  }
})

blogsRouter.post('/', async (request, response) => {
  try {
    const users = await User.find({})
    const user = users[0]
    const data = {likes: 0, user: user._id, ...request.body}
    const blog = new Blog(data)
    if (blog.title === undefined || blog.url === undefined) {
      return response.status(400).json({error: 'Missing blog title or url. '})
    }
    const newBlog = await blog.save()
    user.blogs = user.blogs.concat(blog._id)
    user.save()
    response.status(201).json(newBlog)
  } catch (exception) {
    console.log(exception)
    response.status(500).send({error: 'Something went wrong with the request. '})
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const id = request.params.id
    await Blog.findByIdAndRemove(id)
    return response.status(204).end()
  } catch (exception) {
    return response.status(400).send({error: 'Malformatted id. '})
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const id = request.params.id
    const updatedBlog = await Blog.findByIdAndUpdate(id, request.body, { new: true })
    return response.json(updatedBlog)
  } catch (exception) {
    return response.status(400).send({error: 'Something went wrong with the request. '})
  }
})

module.exports = blogsRouter