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

const mostLikes = (blogs) => {
    let authors = {}
    let authorWithMostLikes = {}
    let mostLikes = 0
    blogs.forEach((blog) => {
        let { author, likes } = blog;
        let blogger = authors[author] === undefined ? {author, likes: 0} : authors[author] 
        blogger.likes += likes
        authors[author] = blogger
        if ( blogger.likes > mostLikes ) {
            mostLikes = blogger.likes
            authorWithMostLikes = blogger
        }
    })
    return authorWithMostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
