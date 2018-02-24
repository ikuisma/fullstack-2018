const supertest = require('supertest')
const { app, server } = require('../index')
const Blog = require('../model/blog')
const api = supertest(app)


const initialBlogs = [
    {   
        title: "Tabs Versus Spaces — The Definitive Guide",
        author: "Devin Developer",
        url: "www.google.com",
        likes: 5
    }
]

beforeAll(async () => {
    await Blog.remove({})
    const blogs = initialBlogs.map(data => Blog(data))
    const promiseArray = blogs.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('get notes', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('all initial blogs are returned', async () => {
        const response = await api
            .get('/api/blogs')
        expect(response.body.length).toBe(initialBlogs.length)
    })
    
    test('returned blog list contains blog from initial database state', async () => {
        const response = await api
            .get('/api/blogs')
        const titles = response.body.map(blog => blog.title)
        expect(titles).toContain('Tabs Versus Spaces — The Definitive Guide')
    })

})

afterAll(() => {
    server.close()
})
