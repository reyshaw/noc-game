import types from './share.types'
import {getPolling, getDefaultConfig, login, logout} from '@/service/api/share.api'
import {isObject, isEmptyObject} from '@/assets/scripts/utils'
import {formatConfig} from './data.helper'
// 轮询函数
let _timeout = null
function ajaxPolling (commit) {
  getPolling().then(res => {
    commit(types.SET_MSG_COUNT, res.data.totalUnreadMsgCount)
    _timeout = setTimeout(function () {
      ajaxPolling(commit)
    }, 20000) // 20秒拿一次
  }, err => {
    throw new Error(err)
  })
}

const store = {
  namespaced: true,
  state: {
    loading: false, // 1. 加载状态 [false / true]
    token: null, // 2.是否登录 [null / token]
    role: 'member', // 3.系统角色 [member 会员 / agent 代理]
    superIDS: { // 4.上级
      shareholderId: 56, // [股东id]
      merchantId: 1038 // [商户id]
    },
    config: {}, // 5.配置项
    baseInfo: {}, // 6.角色基本信息
    tabTitle: '', // 7. 个人中心切换显示的标题
    polling: { // 8.轮询结果
      msgCount: 0 // 消息条数
    }
  },
  getters: {
    [types.LOADING]: state => state.loading,
    [types.TOKEN]: state => state.token,
    [types.ROLE]: state => state.role,
    [types.SUPER_IDS]: state => state.superIDS,
    [types.CONFIG]: state => state.config,
    [types.BASE_INFO]: state => state.baseInfo,
    [types.TAB_TITLE]: state => state.tabTitle,
    [types.MSG_COUNT]: state => state.polling.msgCount
  },
  actions: {
    [types.SET_LOGIN]: async ({commit, dispatch}, {user, header}) => { // 登录操作
      if (!user || !header) {
        throw new Error('请求参数或请求头必传!')
      }
      commit(types.SET_LOADING, true)
      const _user = await login(user, header).then(res => {
        commit(types.SET_LOADING, false)
        if (res.status) { return res.data }
      }).catch(err => {
        commit(types.SET_LOADING, false); throw new Error(err)
      })
      if (_user) {
        commit(types.SET_TOKEN, _user.token)
        commit(types.SET_BASE_INFO, _user.profile)
        dispatch(types.SET_POLLING, true)
      }
    },
    [types.SET_LOGOUT]: async ({commit, dispatch}, deleteConfig) => { // 登出, 可以选择是否删除配置
      const _isDeleted = await logout().then(res => {
        if (res.status) { return true }
      }, err => {
        throw new Error(err)
      })
      if (_isDeleted) {
        dispatch(types.SET_POLLING, false)
        commit(types.SET_TOKEN, null)
        commit(types.SET_BASE_INFO, {})
        if (deleteConfig) { commit(types.SET_CONFIG, {}) }
      }
    },
    [types.SET_POLLING]: ({commit}, start) => {
      if (start) { ajaxPolling(commit) } else { clearInterval(_timeout) }
    },
    [types.SET_CONFIG]: async ({state, commit}, forceUpdate) => { // 传参表示要更新
      if (isEmptyObject(state.config) || forceUpdate) {
        const _config = await getDefaultConfig().then(res => {
          if (res.status) { return formatConfig(res.data) }
        }, err => { throw new Error(err) })
        commit(types.SET_CONFIG, _config)
        if (!state.superIDS.shareholderId || !state.superIDS.merchantId) {
          commit(types.SET_SUPER_IDS, {shareholderId: _config.shareholderId, merchantId: _config.merchantId})
        }
      }
    }
  },
  mutations: {
    [types.SET_LOADING] (state, loading) { state.loading = loading },
    [types.SET_TOKEN] (state, token) { state.token = token },
    [types.SET_ROLE] (state, role) {
      if (['member', 'agent'].includes(role)) { state.role = role } else { throw new Error(`非法角色值role: ${role}`) }
    },
    [types.SET_SUPER_IDS] (state, superIDS) {
      if (isObject(superIDS)) { state.superIDS = superIDS } else { throw new Error(`superIDS非法,只能设置对象: ${superIDS} `) }
    },
    [types.SET_CONFIG] (state, config) {
      if (isObject(config)) { state.config = config } else { throw new Error(`config非法,只能设置对象: ${config} `) }
    },
    [types.SET_BASE_INFO] (state, baseInfo) {
      if (isObject(baseInfo)) { state.baseInfo = baseInfo } else { throw new Error(`baseInfo非法,只能设置对象: ${baseInfo} `) }
    },
    [types.SET_TAB_TITLE] (state, tabTitle) { state.tabTitle = tabTitle },
    [types.SET_MSG_COUNT] (state, msgCount) { state.polling.msgCount = msgCount }
  }
}

export default store
