const blogsRouter = require('express').Router()
const Blog = require('../model/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  try {
    const data = {likes: 0, ...request.body}
    const blog = new Blog(data)
    if (blog.title === undefined || blog.url === undefined) {
      return response.status(400).json({error: 'Missing blog title or url. '})
    }
    const result = await blog.save()
    response.status(201).json(result)
  } catch (exception) {
    response.status(500).json({error: 'Something went wrong with the request. '})
  }
})

module.exports = blogsRouter