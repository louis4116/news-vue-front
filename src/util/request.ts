import axios from 'axios'

const getBaseURL = (): string => {
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_CLIENT_URL
  }
  return 'http://127.0.0.1:8080/'
}

const serverInstance = axios.create({
  baseURL: getBaseURL(),
})

//請求
serverInstance.interceptors.request.use((config) => {
  const status = localStorage.getItem('login-token')
  config.headers.Authorization = `Bearer ${status}`
  return config
})

//回傳
serverInstance.interceptors.response.use(
  (response) => {
    const { status } = response
    if (status === 200) {
      return response.data
    }
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default serverInstance
