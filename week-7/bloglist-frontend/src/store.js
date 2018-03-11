import { combineReducers, createStore, applyMiddleware } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    notification: notificationReducer,
    users: usersReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store