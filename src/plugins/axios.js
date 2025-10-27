import axios from 'axios'

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: 'http://localhost:8000', // 백엔드 서버 주소
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터 (필요시 토큰 추가 등)
instance.interceptors.request.use(
  (config) => {
    // 예: 토큰이 있다면 헤더에 추가
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터 (에러 처리)
instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API 호출 에러:', error)
    return Promise.reject(error)
  }
)

export default instance