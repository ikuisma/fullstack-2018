import { combineReducers, createStore, applyMiddleware } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'
import loginReducer from './reducers/loginReducer'
import blogReducer from './reducers/blogReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    notification: notificationReducer,
    users: usersReducer,
    login: loginReducer,
    blogs: blogReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store