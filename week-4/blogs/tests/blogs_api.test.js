const supertest = require('supertest')
const { app, server } = require('../index')
const Blog = require('../model/blog')
const api = supertest(app)
const { initialBlogs, blogsInDb } = require('./test_helper')

const initialiseDatabase = async () => {
    await Blog.remove({})
    const blogs = initialBlogs.map(data => Blog(data))
    const promiseArray = blogs.map(blog => blog.save())
    await Promise.all(promiseArray)
}

describe('get blogs', () => {

    beforeAll(async () => {
        await initialiseDatabase()
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('all saved blogs from database are returned', async () => {
        const response = await api
            .get('/api/blogs')
        const blogs = await blogsInDb()
        expect(response.body.length).toBe(blogs.length)
    })
    
    test('returned blog list contains blog from initial database state', async () => {
        const response = await api
            .get('/api/blogs')
        const titles = response.body.map(blog => blog.title)
        expect(titles).toContain('Tabs Versus Spaces — The Definitive Guide')
    })

})

describe('post blogs', () => {

    beforeAll(async () => {
        await initialiseDatabase()
    })

    test('new blog post can be added', async () => {
        const blogsBefore = await blogsInDb()
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
        const blogsAfter = await blogsInDb()
        expect(blogsAfter.map(b => b.title)).toContain(newBlog.title)
        expect(blogsAfter.length).toEqual(blogsBefore.length + 1)
    })

    test('creating a blog post with no likes get instantiated with zero likes', async() => {
        const newBlog = {
            title: "Blog post with no likes",
            author: "Devin Developer",
            url: "www.google.com"
        }
        const response = await api.post('/api/blogs').send(newBlog)
        expect(response.status).toBe(201)
        expect(response.body.likes).toBe(0)
    })

    test('creating a blog post with a missing url returns 400', async() => {
        const newBlog = {
            title: "Blog post with no likes",
            author: "Devin Developer"
        }
        await api.post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('creating a blog post with a missing title returns 400', async() => {
        const newBlog = {
            url: "www.google.com",
            author: "Devin Developer"
        }
        await api.post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

})

afterAll(() => {
    server.close()
})
