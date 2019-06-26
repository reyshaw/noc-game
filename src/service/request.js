import axios from 'axios'
import {SUCCESS, FAIL, ERROR_SHOW_MSG} from './response.status'
import {Message} from 'element-ui'
import router from '@/router'
import store from '@/store'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers['Accept'] = 'application/json;charset=utf-8'
// 创建
const request = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 10000,
  withCredentials: true,
  transformRequest: [function (data) {
    return data
  }]
})

// 拦截请求
request.interceptors.request.use(config => {
  config.data = JSON.stringify(config.data)
  config.headers['common'].timestamp = new Date().getTime() // 携带时间戳 af83e9a3edc286995888bf5fed551cd2
  if (store.state.token) {
    config.headers['common'].token = store.state.token
  }
  return config
}, error => {
  Promise.reject(error)
})

// 拦截响应
request.interceptors.response.use(res => { // 200开头的
  store.commit('SET_LOADING', false)
  switch (Number(res.data.code)) {
    case 1:
    case 200:
      return {
        status: SUCCESS,
        data: (res && res.data && res.data.data) || {}
      }
    case 5998:
    case 5031:
    case 1027:
    case 20051:
    case 5999:
    case 1026:
    case 1000:
      Message.error(`认证失败： ${res.data.msg}`)
      store.dispatch('SET_POLLING', false)
      store.commit('SET_TOKEN', null)
      store.commit('SET_BASE_INFO', {})
      setTimeout(() => { router.push(`/${store.state.role}/index`) }, 500)
      break
    default:
      Message.error(`接口错误： ${res.data.msg}`)
      return {
        status: FAIL,
        error: ERROR_SHOW_MSG,
        msg: '未定义的错误: ' + res.data.msg
      }
  }
}, error => {
  store.commit('SET_LOADING', false)
  if (error && error.response) {
    switch (error.response.status) {
      case 400: error.message = '请求错误'; break
      case 401: error.message = '未授权，请登录'; break
      case 403: error.message = '拒绝访问'; break
      case 404: error.message = `请求地址不存在: ${error.response.config.url}`; break
      case 408: error.message = '请求超时'; break
      case 500: error.message = '服务器内部错误'; break
      case 501: error.message = '服务未实现'; break
      case 502: error.message = '网关错误'; break
      case 503: error.message = '服务不可用'; break
      case 504: error.message = '网关超时'; break
      case 505: error.message = 'HTTP版本不受支持'; break
      default: error.message = '未捕获到的状态码'; break
    }
    Message.error(`状态码错误：${error.message}`)
  }
  return Promise.reject(error)
}
)

export default request
