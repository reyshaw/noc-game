import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import memberRoutes from './member.route'
import agentRoutes from './agent.route'
import whiteList from './whiteList'
import {Message} from 'element-ui'

Vue.use(Router)
const _import = require('./_import_' + process.env.NODE_ENV)._import

const router = new Router({
  // mode: 'history',
  routes: [
    { path: '/', name: 'root', redirect: '/member' }, // 首页
    { path: '/404', name: 'Error404', component: _import('exception/Error_404') }, // 错误的路由跳转404
    memberRoutes,
    agentRoutes,
    { path: '*', redirect: '/404' }
  ],
  scrollBehavior (to, from, savedPosition) {
    // return {x: 0, y: 173}
    // return 期望滚动到哪个的位置
  }
})
const checkAuth = async function (to, from, next) { // 检查权限
  if (store.state.role !== to.path.split('/')[1] && to.path !== '/404') { // 说明角色改变了, to.path.split('/')[1]  agent member
    store.commit('SET_ROLE', store.state.role === 'member' ? 'agent' : 'member')
    if (store.state.token) { // 如果已经登录,则清空数据
      const deleteConfig = true // 删除配置
      await store.dispatch('SET_LOGOUT', deleteConfig)
      if (!whiteList.includes(to.path)) {
        router.push({name: store.state.role === 'member' ? 'index' : 'agent_index'})
      }
    }
    const forceUpdate = true // 强制更新配置
    await store.dispatch('SET_CONFIG', forceUpdate)
  } else { // 刷新
    await store.dispatch('SET_CONFIG')
  }
  next()
}
router.beforeEach(async (to, from, next) => {
  if (!whiteList.includes(to.path) && !store.state.token) { // 不在白名单,又没有登录 /agent/agentCenter...
    Message.error('未登陆，请登录访问!')
    router.push({path: `/${to.path.split('/')[1]}/index`})
  } else { // 在白名单 {登录了} / 不在白名单{未登录} ...
    await checkAuth(to, from, next)
  }
})

router.afterEach((to, from, next) => {
  // window.scrollTo(0, 173)
})

export default router
