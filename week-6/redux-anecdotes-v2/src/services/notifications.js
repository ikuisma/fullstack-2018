import store from '../store'
import { createNotification, clearNotification } from '../reducers/notificationReducer'

const displayNotification = (message) => {
    store.dispatch(createNotification(message))
    setTimeout(() => store.dispatch(clearNotification()), 5000)
} 

export default { displayNotification }