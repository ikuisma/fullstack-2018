const anecdoteReducer = (store = [], action) => {
    if (action.type==='VOTE') {
        const old = store.filter(a => a.id !==action.id)
        const voted = store.find(a => a.id === action.id)

        return [...old, { ...voted, votes: voted.votes+1} ]
    }
    if (action.type === 'CREATE') {
        return [...store, action.anecdote]
    }
    if (action.type === 'INIT_ANECDOTES') {
        return action.anecdotes
    }
    return store
}

export const anecdoteCreation = (anecdote) => {
    return {
        type: 'CREATE',
        anecdote
    }
}

export const anecdoteVote = (id) => {
    return {
        type: 'VOTE',
        id
    }
}

export const initAnecdotes = (anecdotes) => {
    return {
        type: 'INIT_ANECDOTES',
        anecdotes
    }
}

export default anecdoteReducer