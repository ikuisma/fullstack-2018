import axios from 'axios';

const serverUrl = '/'
const baseUrl = `${serverUrl}api/persons`

const resourceUrlFor = (person) => `${baseUrl}/${person.id}`

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson).then(response => response.data)
}

const remove = (person) => {
    return axios.delete(resourceUrlFor(person)).then(response => person)
}

const update = (person) => {
    return axios.put(resourceUrlFor(person), person).then(response => response.data)
}

export default {getAll, create, remove, update}