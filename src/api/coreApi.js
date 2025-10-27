import axios from 'axios'

const coreApi = axios.create({
    baseURL: 'http://localhost:8000/algo-core-service',
    withCredentials: true,
})

export default coreApi
