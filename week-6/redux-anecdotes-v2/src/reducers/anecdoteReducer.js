import anecdoteService from '../services/anecdotes'

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

export const createAnecdote = (anecdote) => {
    return async (dispatch) => {
        anecdote = await anecdoteService.createNew(anecdote)
        dispatch({
            type: 'CREATE',
            anecdote
        })
    }
}

export const voteForAnecdote = (anecdote) => {
    return async (dispatch) => {
        await anecdoteService.vote(anecdote)
        dispatch({
            type: 'VOTE',
            id: anecdote.id
        })
    }
}

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            anecdotes
        })
    } 
}

export default anecdoteReducer