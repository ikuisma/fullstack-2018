let token = null

const blogs = [
    {
        _id: '1',
        title: 'Blog title 1',
        author: 'Author 1',
        url: 'www.google.com'
    },{
        _id: '2',
        title: 'Blog title 2',
        author: 'Author 1',
        url: 'www.google.com'
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

const setToken = () => {
}

export default { getAll, setToken, blogs }