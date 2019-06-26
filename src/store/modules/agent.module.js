import types from './agent.types'
import {isEmptyObject} from '@/assets/scripts/utils'
export default {
  namespaced: true,
  state: {
  },
  getters: {
  },
  actions: {
    [types.SET_CONFIG]: ({state, commit}) => {
      if (isEmptyObject(state.config)) {
      }
    }
  },
  mutations: {
    'SET_LOGIN': (state, isLogin) => {
      state.isLogin = isLogin
    }
  }
}
