import Vue from 'vue'
import Pointer from './modules/pointer'
import Hidden from './modules/hidden'
import Scale from './modules/scale'
import Focus from './modules/focus'

Vue.directive('pointer', Pointer)
Vue.directive('hidden', Hidden)
Vue.directive('scale', Scale)
Vue.directive('focus', Focus)
