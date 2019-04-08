import axios from 'axios'
import qs from 'qs'
import AdminConfig from '../config/AdminConfig'

let token = ''
let authApi = axios.create({
  baseURL: `${AdminConfig.server}`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  withCredentials: true
})
authApi.defaults.headers.common['token'] = token

// axios拦截
authApi.interceptors.response.use( async (response) => {
  // 配置token 项目配置暂时不需要
  let user = await JSON.parse(sessionStorage.getItem('access-user')) || ''
  if (user) {
    token = user
  }
  authApi.defaults.headers.common['token'] = token
  return response
}, function (error) {
  return Promise.reject(error)
})



// 登录项
export const login = (params) => authApi.post('/admin/login.action', qs.stringify(params))
export const getOrderInfo = (params) => authApi.post('/admin/order!info.action', qs.stringify(params))

