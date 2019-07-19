<template>
  <div class="wrapper">
    <section class="home-content">
      <div class="home-banner">
        <slider :imgURLS="imgURLS"></slider>
      </div>
      <div class="home-payment-info"> <!--支付的快捷信息-->
        <ul>
          <li>
            <h2><strong>服务优惠</strong><span>Service Advantage</span></h2>
            <div>
              <p>
                <strong>存款到账</strong>
                <span>平均时间</span>
              </p>
              <p><em>45</em></p>
              <p><span class="last">秒</span></p>
            </div>
          </li>
          <li class="margin">
            <h2></h2>
            <div>
              <p>
                <strong>便捷的支付服务</strong>
                <span>平均时间</span>
              </p>
              <p><em>90</em></p>
              <p><span class="last">秒</span></p>
            </div>
          </li>
          <li class="margin">
            <h2></h2>
            <div>
              <p>
                <strong>存款到账</strong>
                <span>平均时间</span>
              </p>
              <p class="number"><em>300</em></p>
              <p><span class="last">秒</span></p>
            </div>
          </li>
          <li class="margin">
            <h2></h2>
            <div>
              <p>
                <strong>种类繁多的游戏</strong>
                <span>平均时间</span>
              </p>
              <p><em>60</em></p>
              <p><span class="last">秒</span></p>
            </div>
          </li>
        </ul>
      </div>
      <div class="home-game-entry"> <!--游戏入口链接-->
        <div class="content">
          <div class="list">
            <ul v-if="GAME_CATEGORIES.length">
              <li v-for="(game, index) in GAME_CATEGORIES"
                  :class="`li${index+1}`"
                  @mouseenter="onListMouseEnter"
                  @mouseleave="onListMouseLeave"
                  :key="index">
                <img :src="require(`../../assets/imgs/home/games/${game.categoryCode.toLowerCase()}.png`)" />
                <transition
                  name="custom-classes-transition"
                  mode="out-in"
                  enter-active-class="animated bounceInUp"
                  leave-active-class="animated zoomOutRight">
                  <div class="mask"> <!-- 这里是弹出来的 -->
                    <ol :class="{column: game.categoryCode === 'fish'}">
                      <li v-for="item in (game.providerVoList && game.providerVoList.length % 2 + 1)"
                          :key="item"
                          v-if="game.providerVoList"
                          :style="handleFirst(game.providerVoList.length, item)">
                        <div class="outer2"
                             v-for="flex in setLayout(game.providerVoList, item)"
                             v-if="game.providerVoList.length"
                             :key="flex">
                          <div class="inner-item"
                               v-for="(ety, index) in getSlicedList(game.providerVoList, flex-1, item)"
                               @mouseenter="onGameMouseEnter"
                               @mouseleave="onGameMouseLeave"
                               :Key="index">
                            <p>
                              <span :class="{small: game.providerVoList.length < 3}">
                                <img src="http://172.16.135.103/ui/gfx_frontend/footer/og.png"
                                     :alt="ety.customName">
                              </span>
                              <strong>{{ety.customName}}</strong>
                              <a :href="ety.link" v-show="false">立即登录</a>
                              <a :href="ety.tryPlay" v-show="false">马上试玩</a>
                            </p>
                          </div>
                        </div>
                      </li>
                    </ol>
                  </div>
                </transition>
              </li>
            </ul>
          </div>
          <div class="advantage">
            <ol>
              <li><strong>奖励多</strong><img src="http://172.16.135.103/ui/gfx_frontend/footer/stars.png"/> </li>
              <li><strong>人气足</strong><img src="http://172.16.135.103/ui/gfx_frontend/footer/stars.png"/></li>
              <li><strong>安全可靠</strong><img src="http://172.16.135.103/ui/gfx_frontend/footer/stars.png"/></li>
            </ol>
            <div class="phone-box"></div>
            <div class="middle">
              <div class="imgs">
                <p><img src="~@/assets/imgs/home/font.png" alt="" width="366" height="95"></p>
                <p><img src="~@/assets/imgs/home/android-apple.png" alt="" width="97" height="34"></p>
              </div>
              <a href="#" @click="onChange(-1)">&lt;&lt;</a>
              <a href="#" class="right" @click="onChange(1)"> &gt;&gt; </a>
              <div class="sliders">
                <ul>
                  <li v-for="(slide, index) in gameSlides" :key="index">
                    <img :src="require(`../../assets/imgs/home/slide_${slide.imgUrl}.png`)" alt="">
                    <p>{{slide.text}}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="right">
              <img src="http://172.16.135.103/ui/gfx_frontend/footer/ogmaster.png"/>
            </div>
          </div>
        </div>
      </div>
    </section>

    <noc-dialog
      :dialogVisible = "dialogVisible"
      :width="'40%'"
      @closeDialog="dialogVisible=false">
      <template
        slot="dialog-content">
        <img src="http://172.16.135.103/ui/gfx_frontend/popuper/popuper.jpg" alt="公告">
      </template>
    </noc-dialog>
  </div>
</template>

<script>

import gameConfig from './home.config'
import Slider from '@/components/slider'
import {createNamespacedHelpers} from 'vuex'
import NocPopuper from '@/components/noc_popuper/nocPopuper'
import NocDialog from '@/components/noc_dialog/NocDialog'
const { mapGetters: mapMemberGetters, mapActions: mapMemberAction } = createNamespacedHelpers('member')

export default {
  name: 'index',
  components: {
    NocPopuper,
    Slider,
    NocDialog
  },
  data () {
    const _config = gameConfig
    const _show = !this.$store.state.token
    return {
      dialogVisible: _show,
      ..._config,
      imgURLS: [
        'http://172.16.135.103/ui/gfx_frontend/banner/banner1.jpg',
        'http://172.16.135.103/ui/gfx_frontend/banner/banner2.jpg',
        'http://172.16.135.103/ui/gfx_frontend/banner/banner3.jpg',
        'http://172.16.135.103/ui/gfx_frontend/banner/banner4.jpg',
        'http://172.16.135.103/ui/gfx_frontend/banner/banner5.png'
      ]
    }
  },
  computed: {
    ...mapMemberGetters(['GAME_CATEGORIES'])
  },
  created () {
    this.SET_GAME_CATEGORIES()
  },
  methods: {
    ...mapMemberAction(['SET_GAME_CATEGORIES']),
    openDialog () { // 打开弹窗
      this.dialogVisible = true
    },
    onChange (type) { // 上一张 / 下一张
      if (type < 0) { // prev
        let last = this.gameSlides.splice(this.gameSlides.length - 2, 1)
        this.gameSlides.unshift(last[0])
      } else { // next
        let first = this.gameSlides.splice(0, 1)
        this.gameSlides.push(first[0])
      }
    },
    onListMouseEnter (evt) { // 列表鼠标进入
      let _img = evt.target.children[0]
      _img.style.filter = 'blur(5px)'
      let _mask = evt.target.children[1]
      _mask.style.display = 'block'
    },
    onListMouseLeave (evt) { // 列表鼠标滑出
      let _img = evt.target.children[0]
      _img.style.filter = 'blur(0px)'
      let _mask = evt.target.children[1]
      _mask.style.display = 'none'
    },
    onGameMouseEnter (evt) { // 进入具体的游戏
      let _p = evt.target.children[0].children
      let _span = _p[0]
      let _strong = _p[1]
      let _a1 = _p[2]
      let _a2 = _p[3]
      _span.style.display = 'none'
      _strong.style.display = 'none'
      _a1.style.display = 'block'
      _a2.style.display = 'block'
    },
    onGameMouseLeave (evt) { // 离开具体的游戏
      let _p = evt.target.children[0].children
      let _span = _p[0]
      let _strong = _p[1]
      let _a1 = _p[2]
      let _a2 = _p[3]
      _span.style.display = 'block'
      _strong.style.display = 'inline'
      _a1.style.display = 'none'
      _a2.style.display = 'none'
    },
    handleFirst (entry, idx) { // 处理第一个元素
      if (entry % 2 === 1 && idx - 1 === 0) { // 如果是单数就处理第一个， 否则不处理
        let persent = 100 / ((entry - 1) / 2 + 1)
        let obj = {
          flex: `0 0 ${persent}%`
          /* height: '100%' */
        }
        return obj
      }
      return {}
    },
    getSlicedList (list, type, item) { // 传值为数组， type:0表示第一段, 1表示第二段
      if (list.length % 2) { // 奇数行
        if (item === 1) {
          return list.slice(0, 1)
        } else {
          return type ? list.slice(1, (list.length + 1) / 2) : list.slice((list.length + 1) / 2)
        }
      } else { // 偶数行
        return !type ? list.slice(0, list.length / 2) : list.slice(list.length / 2)
      }
    },
    setLayout (entry, item) {
      if (entry.length % 2) { // 奇数行
        return item === 1 ? 1 : 2
      } else { // 偶数行
        return 2
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    // // console.log(`step5: beforeRouteEnter...`)
    // next(vm => {
    //   // console.log(`step6: before SET_GAME_CATEGORIES`, vm.$store.state.superIDS.shareholderId, vm.$store.state.superIDS.merchantId)
    //   vm.SET_GAME_CATEGORIES()
    // })
    next()
  }
}
</script>
<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .25s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .home-banner {
    background-color: #020f1d;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 .el-carousel__button {
   width: 10px;
   height: 10px;
   border-radius: 50%;
 }
  img{
    width: 100%;
    vertical-align: bottom;
  }
  .wrapper {
    section.home-content {
      width: 100%;
      height: auto;
      background: url("../../assets/imgs/home/index-bg.png") no-repeat center;
      background-position-y: 450px;
      .home-banner {
        margin: 0 auto;
        width: 100%;
        max-width: 1920px;
        height: 450px;
        overflow: hidden;
        box-sizing: border-box;
        .el-carousel__item {
          div {
            color: #475669;
            font-size: 18px;
            background: url('../../assets/imgs/home/banner/banner_1.png') no-repeat center center;
            background-size: cover;
            height: 552px;
            margin: 0;
            /*&.banner-0 {
              background-image: url('../../assets/imgs/home/banner/banner_0.jpg');
            }
            &.banner-1 {
              background-image: url('../../assets/imgs/home/banner/banner_1.jpg');
            }
            &.banner-2 {
              background-image: url('../../assets/imgs/home/banner/banner_2.jpg');
            }
            &.banner-3 {
              background-image: url('../../assets/imgs/home/banner/banner_3.jpg');
            }
            &.banner-4 {
              background-image: url('../../assets/imgs/home/banner/banner_4.jpg');
            }*/
          }
        }
      }
      .home-payment-info { /**到账相关**/
        width: 100%;
        height: 108px;
        margin-top: -2px;
        ul {
          width: 1200px;
          margin: 0 auto;
          height: 108px;
          box-sizing: border-box;
          overflow: hidden;
          li {
            box-sizing: border-box;
            float: left;
            height: 100%;
            h2 {
              height: 45px;
              width: 100%;
              color: #fff;
              line-height: 45px;
              strong {
                font-weight: bold;
                color: #f6cc00;
                margin-right: 10px;
                font-size: 15px;
              }
              span {
                font-size: 14px;
              }
            }
            div {
              margin-top: -3px;
              p {
                float: left;
                color: #fff;
                strong {
                  display: block;
                  font-weight: bold;
                  font-size: 16px;
                  line-height: 30px;
                }
                span {
                  text-align: right;
                  display: block;
                  font-size: 16px;
                  &.last {
                    line-height: 80px;
                  }
                }
                em {
                  font-size: 57px;
                  font-weight: normal;
                  margin-left: 20px;
                  margin-right: 10px;
                  line-height: 50px;
                  color: #e2d249;
                }
              }
            }
            &.margin {
              margin-left: 115px;
            }
          }
        }
      }
      .home-game-entry { /****/
        width: 100%;
        height: 1430px;
        .content {
          width: 1200px;
          height: 100%;
          margin: 0 auto;
          .list {
            height: 924px;
            width: 100%;
            overflow: hidden;
            ul {
              li {
                width: 440px;
                height: 259px;
                float: left;
                box-sizing: border-box;
                margin-top: 10px;
                padding: 0;
                overflow: hidden;
                position: relative;
                &.li1 {
                  width: 515px;
                  height: 374px;
                  margin-right: 10px;
                }
                &.li2 {
                  width: 675px;
                  height: 374px;
                }
                &.li3 { /**捕鱼**/
                  width: 290px;
                  height: 526px;
                  margin-right: 10px;
                }
                &.li4,&.li5,&.li6,&.li7 {
                  margin-left: 10px;
                }
                &:hover {
                  cursor: pointer;
                }
                img{
                  transition: .3s ease-in-out;
                }
                &:hover img{
                  transform: scale(1.03);
                }
                .mask { /***弹层**/
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  z-index: 2;
                  background: rgba(0,0,0,0.5);
                  left: 0;
                  top: 0;
                  box-sizing: border-box;
                  border: 1px solid #dfe9b2;
                  display: none;
                  ol {
                    height: 100%;
                    display: flex;
                    align-content: center;
                    li {
                      flex: 1;
                      display: flex;
                      flex-direction: column;
                      margin: 0;
                      border: 1px solid #dfe9b2;
                      height: 100%;
                      text-align: center;
                      overflow: hidden;
                      div.outer2 {
                        border-bottom: 1px solid #dfe9b2;
                        flex: 1;
                        display: flex;
                        div.inner-item {
                          display: flex;
                          flex: 1;
                          height: 100%;
                          border-right: 2px solid #dfe9b2;
                          p {
                            flex: 1;
                            align-self: center;
                            overflow: hidden;
                            span, strong {
                              display: block;
                              overflow: hidden;
                              color: #dfe9b2;
                              margin-bottom: 5px;
                              font-size: 13px;
                              margin-left: auto;
                              margin-right: auto;
                              img {
                                width: 55%;
                              }
                              &.small {
                                width: 50%;
                              }
                            }
                            a {
                              width: 60%;
                              min-height: 20px;
                              display: inline-block;
                              outline: none;
                              margin: 0 auto;
                              margin-top: 5px;
                              line-height: 20px;
                              padding: 2px;
                              background: none;
                              border:1px solid #949774;
                              color: #dfe9b2;
                              font-family: "微软雅黑";
                              &:hover {
                                cursor: pointer;
                                color: #ff8a00;
                              }
                            }
                          }
                          &:last-child {
                            border-bottom: none;
                            border-right: none;
                          }
                        }
                        &:last-child {
                          border-bottom: none;
                        }
                      }
                    }
                    &.column { /** fish **/
                      flex-direction: column;
                      li {
                        flex-direction: row;
                        width: 100% !important;
                        div.outer2 {
                          flex-direction: column;
                          border-bottom: none;
                          div.inner-item {
                            flex-direction: column;
                            border-right: 0;
                            border-bottom: 1px solid #dfe9b2;
                            border-right: 1px solid #dfe9b2;
                            p {
                              display: flex;
                              align-self: center;
                              span {
                                flex: 1;
                                align-self: center;
                                height: 90%;
                                img {
                                  height: 100%;
                                  width: 100%!important;
                                }
                                &.small {
                                  height: auto;
                                  width: 60%;
                                }
                              }
                              strong {
                                flex: 1;
                                align-self: center;
                                display: inline-block;
                                float: right;
                              }
                              a {
                                flex: 1;
                                align-self: center;
                                margin: 0 2px;
                                padding: 2px 5px;
                              }
                            }
                            &:last-child {
                              border-bottom: none;
                            }
                          }
                        }
                        &:last-child {
                          border-right: none;
                        }
                        &:first-child {
                          div.outer2 {
                            div.inner-item {
                              p {
                                span {
                                  img {
                                    width: 55% !important;
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          .advantage {
            width: 1200px;
            height: 420px;
            margin-top: 88px;
            position: relative;
            ol {
              width: 160px;
              height: 300px;
              margin-top: 60px;
              float: left;
              margin-right: 15px;
              li {
                line-height: 20px;
                margin-top: 30px;
                strong {
                  font-size: 25px;
                  color: #fff;
                }
                img {
                  width: 70%;
                  margin: 5px 0px;
                }
                border-bottom: 1px solid #fff;
              }
            }
            .phone-box {
              width: 205px;
              height: 420px;
              overflow: hidden;
              float: left;
              /*border: 1px solid green;*/
              border-radius: 30px;
              background: url("http://172.16.135.103/ui/gfx_frontend/footer/phone.png") no-repeat center center;
            }
            .middle {
              width: 460px;
              height: 340px;
             /* background: red;*/
              float: left;
              margin-left: 40px;
              margin-top: 45px;
              .imgs {
                width: 100%;
                height: auto;
                p {
                  width: 348px;
                  height: 101px;
                  margin: 0 auto;
                  img {
                    width: 100%;
                  }
                  &:last-child {
                    width: 97px;
                    height: 34px;
                  }
                }
              }
              a {
                display: inline-block;
                position: absolute;
                width: 20px;
                height: 50px;
                top: 280px;
                color: #fff;
                line-height: 50px;
                text-align: center;
                &.right {
                  left: 865px;
                }
              }
              .sliders {
                position: relative;
                width: 403px;
                height: 130px;
                margin-top: 60px;
                margin-left: 30px;
                /*overflow: hidden;*/
                ul {
                 /* width: 535px;*/
                  height: 130px;
                  display: inline-block;
                  overflow: hidden;
                  position: absolute;
                  li {
                    width: 124px;
                    height: 130px;
                    float: left;
                   /* border: 1px solid green;*/
                    float: left;
                    margin: 0 5px;
                    box-sizing: border-box;
                    img {
                      width: 91px;
                      margin-left: 15px;
                      margin-top: 10px;
                    }
                    p {
                      color: #fff;
                      text-align: center;
                      margin-top: 10px;
                    }
                  }
                }
              }
            }
            .right {
              width: 283px;
              height: 388px;
              float: right;
            }
          }
        }
      }
    }
  }
</style>
