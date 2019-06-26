import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale'
import { getLocalStorage } from './storage'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

const en = require('@/assets/consts/lang/english/en.json')
const cn = require('@/assets/consts/lang/chinese_simple/cn.json')
const tw = require('@/assets/consts/lang/chinese_traditonal/tw.json')
const i18n = new VueI18n({
  locale: getLocalStorage('lang') || 'cn',
  fallbackLocale: getLocalStorage('lang') || 'cn',
  messages: {
    en: {
      ...en,
      ...enLocale
    },
    cn: {
      ...cn,
      ...zhLocale
    },
    tw: {
      ...tw,
      ...zhLocale
    }
  }
})
locale.i18n((key, value) => i18n.t(key, value)) // 重点：为了实现element插件的多语言切换

export default i18n
