import types from './member.types'
import {getIndexGameList} from '@/service/api/member.api'
import {sort} from '@/assets/scripts/utils'
import homeConfig from '@/views/home/home.config'

const member = {
  namespaced: true,
  state: {
    gameCategroies: [] // 1.首页游戏列表
  },
  getters: {
    [types.GAME_CATEGORIES]: state => state.gameCategroies
  },
  actions: {
    [types.SET_GAME_CATEGORIES]: ({state, commit}) => {
      if (!state.gameCategroies.length) {
        getIndexGameList().then(res => {
          if (res && res.data) {
            commit(types.SET_GAME_CATEGORIES, sort(res.data, homeConfig.arrRule))
          }
        }, err => {
          throw new Error(err)
        })
      }
    }
  },
  mutations: {
    [types.SET_GAME_CATEGORIES] (state, gameCategroies) {
      state.gameCategroies = gameCategroies
    }
  }
}

export default member
