import usersService from '../services/users'
const initialState = []

const usersReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'INIT_USERS':
            return action.users
        default:
            return state
    }
}

export const initializeUsers = () => {
    return async (dispatch) => {
        const users = await usersService.getAll()
        dispatch({
            type: 'INIT_USERS',
            users
        })
    }
}

export default usersReducer