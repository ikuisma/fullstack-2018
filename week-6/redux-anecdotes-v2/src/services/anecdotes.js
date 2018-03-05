import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (anecdote) => {
    const response = await axios.post(baseUrl, {...anecdote, votes: 0})
    return response.data
}

const vote = async (anecdote) => {
    anecdote = {...anecdote, votes: anecdote.votes + 1}
    const url = `${baseUrl}/${anecdote.id}`
    await axios.put(url, anecdote)
} 

export default { getAll, createNew, vote }