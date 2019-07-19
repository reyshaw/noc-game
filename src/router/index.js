import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import memberRoutes from '@/router/modules/member.route'
import agentRoutes from '@/router/modules/agent.route'

Vue.use(Router)
const _import = require('@/router/env/_import_' + process.env.NODE_ENV)._import

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
router.beforeEach(async (to, from, next) => {
  if (store.state.role !== to.path.split('/')[1] && to.path !== '/404') { // 角色转变
    await store.dispatch('SET_ROLE', store.state.role === 'member' ? 'agent' : 'member')
  } else {
    await store.dispatch('SET_CONFIG')
  }
  next()
})

router.afterEach((to, from, next) => {
  // window.scrollTo(0, 173)
})

export default router
