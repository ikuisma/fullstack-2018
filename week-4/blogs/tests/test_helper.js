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
  
module.exports = {
    initialBlogs,
    formatBlog,
    blogsInDb
}