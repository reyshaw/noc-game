import {post, get} from '../methods'
import {PATH_POLLING, PATH_LOGOUT_LOGIN} from '../member/urls'
import {PATH_MEMBERLOGIN_LOGIN} from '@/service/member/urls.js'
import PATH from '../agent/user.url'
import store from '@/store'

export function getPolling () { // 查询轮询
  return get(PATH_POLLING, {})
}

export function getDefaultConfig () { // 获取默认配置
  // let path = PATH_GETITEMS_REGISTER
  const path = PATH.CONFIG
  let i
  if (store.state.role === 'agent') {
    i = 1
  } else {
    i = 0
  }
  return post(path, {roleType: i})
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
