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

describe('get blogs', () => {

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

describe('post blogs', () => {

    test('new blog post can be added', async () => {
        const newBlog = {   
            title: "New Blog Post",
            author: "Devin Developer",
            url: "www.google.com",
            likes: 1
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    })

    test('creating a blog post with no likes get instantiated with zero likes', async() => {
        const newBlog = {
            title: "Blog post with no likes",
            author: "Devin Developer",
            url: "www.google.com",
        }
        const response = await api.post('/api/blogs').send(newBlog)
        expect(response.status).toBe(201)
        expect(response.body.likes).toBe(0)
    })

})

afterAll(() => {
    server.close()
})
