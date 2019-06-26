// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'babel-polyfill'

import router from './router'
import store from './store'
import { get, post, put, del } from './service/methods'

import i18n from '@/assets/scripts/i18n' // 国际化
// import '@/assets/styles/iconfont.css' // iconfont图标库
import animated from 'animate.css'
import '@/assets/styles/reset.css'// 去掉默认样式
import 'nprogress/nprogress.css'//
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/global.scss' // 全局样式配置
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '@/directives/index'
import '@/filters/index'
import '@/assets/scripts/bubbly-bg.js'
import ElementUI from 'element-ui'
// import * as filters from '@/filters/numberFilter'

Vue.config.productionTip = false
Vue.use(ElementUI, scroll)
Vue.use(VueAwesomeSwiper)
Vue.use(animated)

Vue.prototype.get = get
Vue.prototype.post = post
Vue.prototype.put = put
Vue.prototype.delete = del
Vue.prototype.store = store

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
