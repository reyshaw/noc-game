<template>
  <div class="box">
    <ul>
      <li v-for="(item, idx) in items" :key="idx">
        <i :class="['iconfont', item.icon]" v-pointer v-scale></i>
        <strong>{{item.label}}</strong>
        <strong>{{item.value}}</strong>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data () {
    return {
      items: [
        {icon: 'icondianhua1', label: '电话', value: '+63 9175946666'},
        {icon: 'iconqq-copy', label: 'QQ', value: '12345678901'},
        {icon: 'iconwechat1', label: '微信', value: 'OGMKTG'},
        {icon: 'iconemail', label: '邮箱', value: 'marketing@orientalgame.com'},
        {icon: 'iconHangout', label: '环聊', value: 'weirfrrtt'},
        {icon: 'icontelegram', label: '纸飞机', value: 'weirfrrtt'},
        {icon: 'iconskype1', label: 'Skype', value: 'weirfrrtt'}
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  .box {
    width: 100%;
    height: 100px;
    background: url("../../../assets/imgs/contact-bg.jpg") repeat-x center bottom;
    box-sizing: border-box;
    padding-top: 10px;
    position: absolute;
    bottom: 0;
    ul {
      width: 1300px;
      height: 80px;
      margin: 0 auto;
      display: flex;
      li {
        flex: 1 1 auto;
        height: 80px;
        padding-top: 20px;
        box-sizing: border-box;
        background: url("../../../assets/imgs/contact-border.jpg") no-repeat left center;
        &:first-child {
          background: none;
        }
        i {
          float: left;
          font-size: 38px;
          color: #fff;
          margin: 0 10px 0 15px;
        }
        strong {
          color: #fff;
          display: block;
          font-size: 15px;
          line-height: 20px;
        }
      }
    }
  }
</style>
