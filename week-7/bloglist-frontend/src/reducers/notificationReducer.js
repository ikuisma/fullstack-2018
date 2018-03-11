const notificationReducer = (state=null, action) => {
    switch (action.type) {
        case 'CREATE_NOTIFICATION':
            return action.notification
        case 'CLEAR_NOTIFICATION':
            return null
        default:
            return state
    }
}

export const createNotification = (notification) => {
    return {
        type: 'CREATE_NOTIFICATION',
        notification
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}

export const notify = (notification, seconds) => {
    return async (dispatch) => {
        const millis = seconds * 1000
        dispatch(createNotification(notification))
        setTimeout(() => {
            dispatch(clearNotification)
        }, millis)
    }
}

export default notificationReducer