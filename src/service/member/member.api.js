import {post} from '../req.methods'
import {PATH_INDEX_GAME} from './urls'
import store from '@/store'
import CONST from '@/assets/consts/global'

/***
 * 获取首页游戏列表
 */
export const getIndexGameList = () => {
  return post(PATH_INDEX_GAME, {
    merchantId: store.state.superIDS.merchantId,
    shareholderId: store.state.superIDS.shareholderId,
    terminalType: CONST.TERMINAL_TYPE
  })
}

export default {
  getIndexGameList
}
