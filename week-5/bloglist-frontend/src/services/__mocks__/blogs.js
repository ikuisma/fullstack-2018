let token = null

const blogs = []

const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll, blogs }