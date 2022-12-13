import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
NProgress.configure({ showSpinner: false })
const http = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  timeout: 5000
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  NProgress.start()
  if (config.url !== '/login' && config.url !== '/register') {
    if (userStore.token) {
      config.headers.Authorization = `bearer ${userStore.token}`
    } else {
      delete config.headers.Authorization
    }
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  NProgress.done()
  if (response.data.code === 200) {
    return response
  } else {
    return Promise.reject(response.data.message)
  }
  // 对响应数据做点什么
}, function (error) {
  NProgress.done()
  const status = error.response?.status || 500
  let message
  switch (status) {
    case 404:
      message = '接口找不到~'
      break
    case 500:
      message = '服务器错误'
      break
    default:
      message = '未知错误'
      break
  }

  // 对响应错误做点什么
  return Promise.reject(message)
})

const request = (options) => {
  return new Promise((resolve, reject) => {
    http(options).then(res => {
      resolve(res.data)
    })
      .catch(err => {
        console.error(err)
        ElMessage.error(err)
      })
  })
}

export default request
