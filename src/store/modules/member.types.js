import {arrayToObject} from '@/assets/scripts/utils'

const TYPES = [
  'GAME_CATEGORIES',
  'SET_GAME_CATEGORIES',
  'TOKEN',
  'SET_TOKEN',
  'LOGIN_DIALOG',
  'SET_LOGIN_DIALOG',
  'REGISTER_DIALOG',
  'SET_REGISTER_DIALOG'
]

export default arrayToObject(TYPES)
