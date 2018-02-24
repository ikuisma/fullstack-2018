const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((likes, blog) => likes + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    return blogs.reduce((favorite, blog) => blog.likes > favorite.likes ? blog : favorite)
}

const mostBlogs = (blogs) => {
    let authors = {}
    let authorWithMostBlogs = {}
    let mostBlogs = 0
    blogs.forEach((blog) => {
        let author = blog.author;
        let blogger = authors[author] === undefined ? {author, blogs: 0} : authors[author] 
        blogger.blogs += 1
        authors[author] = blogger
        if ( blogger.blogs > mostBlogs ) {
            mostBlogs = blogger.blogs
            authorWithMostBlogs = blogger
        }
    })
    return authorWithMostBlogs
} 

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
