import axios from 'axios'

const getBaseURL = (): string => {
  if (import.meta.env.PROD) {
    return 'https://news-ecru-iota.vercel.app/'
  }
  return 'http://127.0.0.1:8080/'
}

const serverInstance = axios.create({
  baseURL: getBaseURL(),
})

serverInstance.interceptors.request.use((config) => {
  const status = localStorage.getItem('login-token')
  config.headers.Authorization = `Bearer ${status}`
  return config
})

serverInstance.interceptors.response.use(
  (response) => {
    const { status } = response
    if (status === 200) {
      return response.data
    }
  },
  (error) => {
    // console.log(error)
    // console.log(error.response.data.msg)
    return Promise.reject(error)
  },
)

export default serverInstance
