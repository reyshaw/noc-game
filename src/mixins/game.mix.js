import {
  PATH_GAMEPLIST_GAME,
  PATH_GAMEPROVIDERSLIST_GAME,
  PATH_LOBBYYRL_GAME,
  PATH_LOGINURL_GAME
} from '@/service/member/urls.js'
import {mapGetters} from 'vuex'
import types from '@/store/share.types'
const gameMix = {
  data () {
    return {
      listData: [],
      pageDomain: {
        pageNum: 0,
        pageSize: 24
      },
      platformList: '', // 游戏厂商列表
      platformId: '', // 当前游戏厂商
      platformIdList: [], // 当前厂商列表
      gameList: '' // 游戏列表
    }
  },
  computed: {
    ...mapGetters(['SUPER_IDS', 'TOKEN'])
  },
  methods: {
    async getPlatformUrl (category) { // 直接进游戏平台方法
      const payload = {
        category,
        merchantId: this.SUPER_IDS.merchantId,
        shareholderId: this.SUPER_IDS.shareholderId,
        terminalType: '1'
      }
      await this.post(PATH_LOBBYYRL_GAME, payload).then((res) => {
        this.platformList = res.data
        for (let i = 0; i < this.platformList.length; i++) {
          this.platformIdList[i] = this.platformList[i].id
        }
      }, err => {
        console.log(err)
      })
    },
    async getPlatform (category) { // 获取游戏平台方法
      const payload = {
        category,
        merchantId: this.SUPER_IDS.merchantId,
        shareholderId: this.SUPER_IDS.shareholderId,
        terminalType: '1'
      }
      await this.post(PATH_GAMEPROVIDERSLIST_GAME, payload).then((res) => {
        this.platformList = res.data
        this.platformIdList = this.platformList[0].id
      }, err => {
        console.log(err)
      })
    },
    async getGameList (category) { // 获取游戏方法
      this.pageDomain = {
        ...this.pageDomain,
        pageNum: this.pageDomain.pageNum + 1
      }
      const payload = {
        category,
        providerId: this.platformId,
        merchantId: this.SUPER_IDS.merchantId,
        shareholderId: this.SUPER_IDS.shareholderId,
        terminalType: '1',
        pageDomain: this.pageDomain
      }
      console.log(1, this.platformId)
      await this.post(PATH_GAMEPLIST_GAME, payload).then((res) => {
        if (res.data.length > 0) {
          this.gameList = this.gameList.concat(res.data)
        }
      }, err => {
        console.log(err)
      })
    },
    async enterGame (gameId, i) { // 进游戏方法
      console.log(this.platformIdList)
      console.log(i)
      if (this.TOKEN) {
        const payload = {
          gameId,
          merchantId: this.SUPER_IDS.merchantId,
          shareholderId: this.SUPER_IDS.shareholderId,
          terminalType: '1',
          providerId: this.platformIdList[i]
        }
        await this.post(PATH_LOGINURL_GAME, payload).then((res) => {
          if (res.code === 200) {
            window.open(res.data, '_blank')
          }
        }, err => {
          console.log(err)
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请先登录'
        })
        this.$store.commit(types.SHOWLOGINDIA, true)
      }
    }
  }
}

export default gameMix
