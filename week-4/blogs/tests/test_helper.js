const Blog = require('../model/blog')

const initialBlogs = [
    {   
        title: "Tabs Versus Spaces — The Definitive Guide",
        author: "Devin Developer",
        url: "www.google.com",
        likes: 5
    }
]

const formatBlog = (blog) => {
    return {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        id: blog._id
    }
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(formatBlog)
}

const nonExistingId = async () => {
    const blog = new Blog()
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
  }
  
module.exports = {
    initialBlogs,
    formatBlog,
    blogsInDb,
    nonExistingId
}