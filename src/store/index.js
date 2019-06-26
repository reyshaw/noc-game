import Vue from 'vue'
import Vuex from 'vuex'
import share from './share.store'
import agent from './modules/agent.module'
import member from './modules/member.module'
import createPersistedState from 'vuex-persistedstate' // 持久化vuex
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const createPersisted = createPersistedState({
  storage: window.sessionStorage
  // reducer (val) {
  //   let _obj = JSON.parse(JSON.stringify(val))
  //   for (let key of Object.keys(_obj)) {
  //     if (key === 'showLoginDia') { // 要排除的放在这里
  //       delete _obj[key]
  //     }
  //   }
  //   return _obj
  // }
})

export default new Vuex.Store({
  ...share,
  modules: {
    member,
    agent
  },
  strict: debug,
  plugins: [createPersisted]
})
