import {post, get} from '../req.methods'
import {PATH_POLLING, PATH_LOGOUT_LOGIN} from '../member/urls'
import {PATH_MEMBERLOGIN_LOGIN} from '@/service/member/urls.js'
import PATH from '../agent/user.url'
import store from '@/store'

/***
 * 轮询消息
 */
export function getPolling () {
  return get(PATH_POLLING, {})
}

/***
 * 获取默认配置
 */
export async function getDefaultConfig () { // 获取默认配置
  // let path = PATH_GETITEMS_REGISTER
  const path = PATH.CONFIG
  const _cfg = await post(path, {roleType: store.state.role === 'agent' ? 1 : 0})
  const {status, data} = _cfg
  if (status) {
    return data
  }
}

/***
 * 登录, 需要传 header
 * @param user: {username: '', password: '', verifyCode: ''}
 * @param header {uuid: '', timestamp: ''}
 */
export async function login (user, header) {
  let path = PATH_MEMBERLOGIN_LOGIN
  if (store.state.role === 'agent') {
    path = PATH.LOGIN
  }
  return post(path, user, header)
}

/***
 * 登出
 */
export async function logout () { // 登出
  let path = PATH_LOGOUT_LOGIN
  if (store.state.role === 'agent') {
    // 代理
  }
  return get(path, {})
}

export default {
  getPolling,
  getDefaultConfig,
  login,
  logout
}
