import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson).then(response => response.data)
}

const remove = (person) => {
    const id = person.id
    return axios.delete(`${baseUrl}/${id}`).then(response => person)
}

export default {getAll, create, remove}