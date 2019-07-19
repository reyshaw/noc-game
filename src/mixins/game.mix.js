import {
  PATH_GAMEPLIST_GAME, // 请求游戏列表
  PATH_GAMEPROVIDERSLIST_GAME, // 请求游戏厂商列表
  PATH_LOBBYYRL_GAME, // 请求游戏大厅作为跳转id列表
  PATH_LOGINURL_GAME // 游戏跳转
} from '@/service/member/urls.js'
import {mapGetters, mapMutations} from 'vuex'
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
    ...mapMutations('member', ['SET_LOGIN_DIALOG']),
    ...mapMutations(['SET_LOADING']),
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
        console.log(this.platformIdList[0])
      }, err => {
        this.$message.error(err)
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
        this.$message.error(err)
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
      await this.post(PATH_GAMEPLIST_GAME, payload).then((res) => {
        if (res.data.length > 0) {
          this.gameList = this.gameList.concat(res.data)
        }
      }, err => {
        this.$message.error(err)
      })
    },
    async enterGame (gameId, i) { // 进游戏方法
      if (this.TOKEN) {
        const payload = {
          gameId,
          merchantId: this.SUPER_IDS.merchantId,
          shareholderId: this.SUPER_IDS.shareholderId,
          terminalType: '1',
          providerId: i
        }
        this.SET_LOADING(true)
        await this.post(PATH_LOGINURL_GAME, payload).then((res) => {
          this.SET_LOADING(false)
          if (res.status) {
            // window.open(res.data, '_blank')
            this.createIframe(document.body, res.data)
          }
        }, err => {
          this.$message.error(err)
        })
      } else {
        // this.$message({
        //   type: 'warning',
        //   message: '请先登录'
        // })
        this.SET_LOGIN_DIALOG(true)
        // this.$store.commit(types.SET_LOGIN_DIALOG, true)
      }
    },
    createIframe (dom, src, onload) {
      // 在document中创建iframe
      console.log(dom)

      // 设置遮罩层
      const layer = document.createElement('div')
      layer.style.width = '100%'
      layer.style.height = '100%'
      layer.style.overflow = 'hidden'
      layer.style.backgroundColor = 'rgba(0, 0, 0, .5)'
      layer.style.position = 'absolute'
      layer.style.zIndex = '999'
      layer.style.top = '0'
      layer.style.textAlign = 'center'

      // 设置iframe
      const iframe = document.createElement('iframe')
      iframe.style.width = '98%'
      iframe.style.height = '94%'
      iframe.style.margin = '0'
      iframe.style.marginTop = '2%'
      iframe.style.padding = '0'
      iframe.style.overflow = 'hidden'
      iframe.style.border = 'none'
      iframe.style.boxShadow = '0 0 8px rgba(0, 0, 0, .8)'

      // 设置关闭按钮
      const close = document.createElement('i')
      close.style.width = '40px'
      close.style.height = '40px'
      close.style.fontSize = '40px'
      close.style.textAlign = 'center'
      close.style.lineHeight = '30px'
      close.style.borderRadius = '20px'
      close.style.backgroundColor = 'white'
      close.innerText = 'x'
      close.style.position = 'absolute'
      close.style.top = '2%'
      close.style.right = '0'
      close.style.zIndex = '9999'
      close.style.cursor = 'pointer'

      // 绑定iframe的onload事件
      if (onload && Object.prototype.toString.call(onload) === '[object Function]') {
        if (iframe.attachEvent) {
          iframe.attachEvent('onload', onload)
        } else if (iframe.addEventListener) {
          iframe.addEventListener('load', onload)
        } else {
          iframe.onload = onload
        }
      }

      // 绑定close的关闭事件
      if (close.attachEvent) {
        close.attachEvent('click', () => this.destroyIframe(iframe))
      } else if (close.addEventListener) {
        close.addEventListener('click', () => this.destroyIframe(iframe))
      } else {
        close.click = () => this.destroyIframe(iframe)
      }

      iframe.src = src
      // 把iframe加载到dom下面
      dom.appendChild(layer)
      layer.appendChild(iframe)
      layer.appendChild(close)
      return iframe
    },
    destroyIframe (iframe) {
      // 把iframe指向空白页面，这样可以释放大部分内存。
      iframe.src = 'about:blank'
      try {
        iframe.contentWindow.document.write('')
        iframe.contentWindow.document.clear()
      } catch (e) {}
      // 把iframe从页面移除
      document.body.removeChild(iframe.parentNode)
    }
  }
}

export default gameMix
