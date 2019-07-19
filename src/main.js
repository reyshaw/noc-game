// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'babel-polyfill'

import router from './router'
import store from './store'
import { get, post, put, patch, del } from './service/req.methods'

// 样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import '@/assets/styles/iconfont.css' // iconfont图标库
import animated from 'animate.css' // 动画插件
import '@/assets/styles/reset.css'// 去掉默认样式
import 'nprogress/nprogress.css'// 进度条插件
import '@/assets/styles/global.scss' // 全局样式配置
import 'swiper/dist/css/swiper.css' // 轮播滚动插件
import VueAwesomeSwiper from 'vue-awesome-swiper' // 轮播滚动插件
import '@/assets/scripts/bubbly-bg.js' // 泡泡背景插件

// 工具
import i18n from '@/assets/scripts/i18n' // 国际化
import '@/directives/index' // 自定义指令
import '@/filters/index' // 自定义过滤器
import moment from 'moment' // 时间格式处理插件

Vue.config.productionTip = false
Vue.use(ElementUI, scroll)
Vue.use(VueAwesomeSwiper)
Vue.use(animated)

// 定义在原型链上的全局方法
Vue.prototype.get = get
Vue.prototype.post = post
Vue.prototype.put = put
Vue.prototype.patch = patch
Vue.prototype.delete = del
Vue.prototype.store = store
Vue.prototype.moment = moment
moment.locale(['zh-cn', 'zh-tw'])

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
