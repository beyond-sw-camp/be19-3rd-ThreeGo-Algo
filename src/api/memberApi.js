import axios from 'axios'

const memberApi = axios.create({
    baseURL: 'http://localhost:8000/algo-member-service',
    withCredentials: true,
})

// 모든 요청에 토큰 자동 첨부
memberApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

export default memberApi
