import {post, get} from '../methods'
import {PATH_POLLING, PATH_GETITEMS_REGISTER, PATH_LOGOUT_LOGIN} from '../member/urls'
import {PATH_MEMBERLOGIN_LOGIN} from '@/service/member/urls.js'
import PATH from '../agent/user.url'
import store from '@/store'

export function getPolling () { // 查询轮询
  return post(PATH_POLLING, {})
}

export function getDefaultConfig () { // 获取默认配置
  let path = PATH_GETITEMS_REGISTER
  if (store.state.role === 'agent') {
    path = PATH.CONFIG
  }
  return post(path, {})
}

export function login (user, header) { // 登录，需要穿header
  let path = PATH_MEMBERLOGIN_LOGIN
  if (store.state.role === 'agent') {
    path = PATH.LOGIN
  }
  return post(path, user, header)
}

export function logout () { // 登出
  let path = PATH_LOGOUT_LOGIN
  if (store.state.role === 'agent') {
    // 代理
  }
  return get(path, {})
}
