import blogsService from '../services/blogs'

const initialState = []

const blogReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.blogs
        case 'UPDATE_BLOG':
            const blogs = state.filter(b => b._id !== action.blog._id)
            return [...blogs, action.blog]
        case 'ADD_BLOG':
            return [...state, action.blog]
        case 'DESTROY_BLOG':
            return state.filter(b => b._id !== action.blog._id)
        default:
            return state
    }
}

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogsService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            blogs
        })
    }
}

export const createBlog = (data) => {
    return async (dispatch) => {
        const blog = await blogsService.create(data)
        dispatch({
            type: 'ADD_BLOG',
            blog
        })
    }
}

export const increaseLikes = (blog) => {
    return async (dispatch) => {
        const updatedBlog = {...blog}
        updatedBlog.likes += 1
        await blogsService.update(updatedBlog)
        dispatch({
            type: 'UPDATE_BLOG',
            blog: updatedBlog
        })
    }
}

export const createComment = (comment, blog) => {
    return async (dispatch) => {
        const updatedBlog = await blogsService.createComment(blog._id, comment)
        dispatch({
            type: 'UPDATE_BLOG',
            blog: updatedBlog
        })
    }
}

export const deleteBlog = (blog) => {
    return async (dispatch) => {
        await blogsService.destroy(blog)
        dispatch({
            type: 'DESTROY_BLOG',
            blog
        })
    }
}

export default blogReducer