import axios from 'axios'

const envConfig = {
  production: '/app',
  development: '/app'
}

export const baseURL = envConfig[process.env.NODE_ENV || 'development']

export const http = axios.create({
  baseURL,
  timeout: 10000 * 60,
  headers: {
    common: {
      // 'X-Requested-With': 'XMLHttpRequest',
      // 'token': Cookies.get('token')
    },
    post: {
      // 'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
})

// 请求前的钩子函数
http.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// 请求后的钩子函数
http.interceptors.response.use(function (res) {
  return Promise.resolve(res.data)
}, function (error) {
  return Promise.reject(error)
})
export default http
