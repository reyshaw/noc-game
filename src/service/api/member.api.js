import {post} from '../methods'
import {PATH_INDEX_GAME} from '../member/urls'
import store from '@/store'
import CONST from '@/assets/consts/global'

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
