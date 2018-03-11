const blogsRouter = require('express').Router()
const Blog = require('../model/blog')
const User = require('../model/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
    response.json(blogs)
  } catch (exception) {
    console.log(exception)
    response.status(500).send({error: 'Server error. '})
  }
})

const authenticate = (request, response, next) => {
  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid. '}).end()
    }
    User.findById(decodedToken.id).then(user => {
      request.user = user
      next()
    })
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message }).end()
    } else {
      console.log(exception)
      response.status(500).send({error: 'Something went wrong with the request. '}).end()
    }
  }
}

blogsRouter.post('/', authenticate, async (request, response) => {
  try {
    const user = request.user
    const blog = new Blog({likes: 0, user: user._id, ...request.body})
    if (blog.title === undefined || blog.url === undefined) {
      return response.status(400).json({error: 'Missing blog title or url. '})
    }
    await blog.save()
    user.blogs = user.blogs.concat(blog._id)
    await user.save()
    response.status(201).json(await Blog.findById(blog._id).populate('user', { username: 1, name: 1}))
  } catch (exception) {
      console.log(exception)
      response.status(500).send({error: 'Something went wrong with the request. '})
    }
  }
)

blogsRouter.delete('/:id', authenticate, async (request, response) => {
  try {
    const user = request.user
    const id = request.params.id
    const blog = await Blog.findById(id)
    if (!blog.user || String(blog.user) === String(user._id) ) {
      await Blog.findByIdAndRemove(id)
      return response.status(204).end()
    } else {
      return response.status(401).send({ error: 'You do not have access to this resource. '})
    }
  } catch (exception) {
    return response.status(400).send({error: 'Malformatted id. '})
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const id = request.params.id
    const updatedBlog = await Blog.findByIdAndUpdate(id, request.body, { new: true }).populate('user', {username: 1, name: 1})
    return response.json(updatedBlog)
  } catch (exception) {
    return response.status(400).send({error: 'Something went wrong with the request. '})
  }
})

module.exports = blogsRouter