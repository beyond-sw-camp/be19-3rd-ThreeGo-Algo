import axios from 'axios'

const memberApi = axios.create({
    baseURL: 'http://localhost:8000/algo-member-service',
    withCredentials: true,
})

export default memberApi
