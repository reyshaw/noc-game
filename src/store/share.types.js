import {arrayToObject} from '@/assets/scripts/utils'

const TYPES = [
  'LOADING',
  'SET_LOADING',
  'TOKEN',
  'SET_TOKEN',
  'ROLE',
  'SET_ROLE',
  'SUPER_IDS',
  'SET_SUPER_IDS',
  'CONFIG',
  'SET_CONFIG',
  'BASE_INFO',
  'SET_BASE_INFO',
  'TAB_TITLE',
  'SET_TAB_TITLE',
  'POLLING',
  'SET_POLLING',
  'MSG_COUNT',
  'SET_MSG_COUNT',
  'SET_LOGIN',
  'SET_LOGOUT'
  // 'SHOWFORGETPWDDIA',
  // 'SHOWLOGINDIA',
  // 'MEMBERINFO'
]

export default arrayToObject(TYPES)
