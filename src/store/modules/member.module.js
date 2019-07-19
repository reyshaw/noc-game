import types from './member.types'
import {getIndexGameList} from '@/service/member/member.api'
import {sort} from '@/assets/scripts/utils'
import homeConfig from '@/views/home/home.config'

const member = {
  namespaced: true,
  state: {
    gameCategroies: [], // 1.首页游戏列表
    showLoginDialog: false,
    showRegisterDialog: false
  },
  getters: {
    [types.GAME_CATEGORIES]: state => state.gameCategroies,
    [types.LOGIN_DIALOG]: state => state.showLoginDialog,
    [types.REGISTER_DIALOG]: state => state.showRegisterDialog
  },
  actions: {
    [types.SET_GAME_CATEGORIES]: async ({state, commit}) => {
      if (!state.gameCategroies.length) {
        const { status, data } = await getIndexGameList()
        status && commit(types.SET_GAME_CATEGORIES, sort(data, homeConfig.arrRule))
      }
    }
  },
  mutations: {
    [types.SET_GAME_CATEGORIES] (state, gameCategroies) {
      state.gameCategroies = gameCategroies
    },
    [types.SET_LOGIN_DIALOG] (state, showLoginDialog) {
      state.showRegisterDialog = false
      state.showLoginDialog = showLoginDialog
    },
    [types.SET_REGISTER_DIALOG] (state, showRegisterDialog) {
      state.showLoginDialog = false
      state.showRegisterDialog = showRegisterDialog
    }
  }
}

export default member
