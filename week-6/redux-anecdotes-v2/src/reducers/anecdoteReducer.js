const getId = () => (100000*Math.random()).toFixed(0)

const anecdoteReducer = (store = [], action) => {
    if (action.type==='VOTE') {
        const old = store.filter(a => a.id !==action.id)
        const voted = store.find(a => a.id === action.id)

        return [...old, { ...voted, votes: voted.votes+1} ]
    }
    if (action.type === 'CREATE') {

        return [...store, { content: action.content, id: getId(), votes:0 }]
    }
    if (action.type === 'INIT_ANECDOTES') {
        return action.anecdotes
    }
    return store
}

export const anecdoteCreation = (content) => {
    return {
        type: 'CREATE',
        content
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