const filterReducer = (store = null, action) => {
    switch(action.type) {
    case 'SET_FILTER':
        return action.filter
    default:
        return store
    }
}

export const setFilter = (filter) => {
    return {
        type: 'SET_FILTER',
        filter: filter === '' ? null : filter
    }
} 

export default filterReducer