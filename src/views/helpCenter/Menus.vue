<template>
  <div class="center">
    <div class="left">
      <ul>
        <li v-for="(menu,index) in menus"
            :key="index"
            @click="handleMenu(menu, index)"
            :class="{active: activeIndex === index}">
          {{menu.label}}
        </li>
      </ul>
    </div>
    <div class="right">
      <h1 v-if="!menus[activeIndex]['hideTop']">{{menus[activeIndex].label}}</h1>
      <router-view :key="routerIndex"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menus',
  data () {
    let menus = [
      {value: 'AboutUs', label: '关于我们'},
      {value: 'Privacy', label: '用户隐私'},
      {value: 'Agreement', label: '用户协议'},
      {value: 'Responsibility', label: '博彩责任'},
      {value: 'Statement', label: '免责声明'},
      {value: 'Rules', label: '游戏规则', hideTop: true},
      {value: 'Questions', label: '常见问题', hideTop: true},
      {value: 'DepositTutorial', label: '存款教程', hideTop: true},
      {value: 'ClaimTutorial', label: '取款教程', hideTop: true},
      {value: 'AgentCenter', label: '代理中心'},
      {value: 'ContactUs', label: '联系我们'},
      {value: 'SafeTutorial', label: '防劫持教程', hideTop: true}
    ]
    return {
      activeIndex: 0, // 当前激活的菜单
      menus,
      routerIndex: 0
    }
  },
  created () {
    let _path = this.$route.path.split('/')
    let last = _path[_path.length - 1]
    let index = -1
    this.menus.forEach((item, idx) => {
      if (item.value === last) {
        index = idx
      }
    })
    this.handleMenu(this.menus[index], index)
  },
  methods: {
    handleMenu (menu, index) {
      this.activeIndex = index
      this.routerIndex++
      this.$router.push({
        name: menu.value
      })
    }
  }
}
</script>

<style scoped lang="scss">
  div.center {
    width: 1200px;
   /* max-height: 700px;*/
    margin: 0 auto;
    display: flex;
    .left {
      flex: 0 0 20%;
      margin-bottom: 20px;
      ul {
        width: 80%;
        border: 1px solid #ccc;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.33);
        margin-top: 15px;
        li {
          font-size: 16px;
          color: #333;
          text-align: center;
          height: 30px;
          margin-top: 15px;
          border-radius: 3px;
          &:hover {
            cursor: pointer;
            color: red;
          }
          &.active {
            color: red;
            font-weight: bold;
          }
        }
      }
    }
    .right {
      border: 1px solid  #ccc;
      flex: 0 0 80%;
      margin-top: 15px;
      border-radius: 2px;
      margin-bottom: 15px;
      box-sizing: border-box;
      padding: 15px;
      h1 {
        border-bottom: 1px dashed #999;
        line-height: 30px;
        margin-bottom: 10px;
        color: #333;
        font-size: 16px;
        text-align: center;
        font-weight: bold;
      }
      div {
        font-size: 14px;
        color: #999;
        padding: 10px;
        box-sizing: border-box;
        line-height: 24px;
      }
    }
  }
</style>
