import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = null

const loginReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.user
        case 'CLEAR_USER':
            return null
        default:
            return state
    }
}

const loadUserFromLocalStorage = () => {
    const userString = window.localStorage.getItem('user')
    const user = userString !== undefined ? JSON.parse(userString) : null
    return user
}

const saveUserToLocalStorage = (user) => {
    window.localStorage.setItem('user', JSON.stringify(user))
}

const clearUserFromLocalStorage = () => {
    window.localStorage.setItem('user', null)
}

export const initializeCredentials = () => {
    return async (dispatch) => {
        const user = loadUserFromLocalStorage()
        if (user !== null) {
            dispatch({
                type: 'SET_USER',
                user
            })
            blogService.setToken(user.token)
        }
    }
}

export const login = (username, password) => {
    return async (dispatch) => {
        const user = await loginService.login({username, password})
        saveUserToLocalStorage(user)
        dispatch({
            type: 'SET_USER',
            user
        })
        blogService.setToken(user.token)
    }
}

export const logout = () => {
    return async (dispatch) => {
        dispatch({
            type: 'CLEAR_USER'
        })
        clearUserFromLocalStorage()
    }
}

export default loginReducer