<template>
  <div class="Content">
    <div class="platformList">
      <div
        v-for="(item, index) in referencePlatform"
        class="platformItem"
        :key="index">
        <div class="logo"><img src="http://172.16.135.103/ui/gfx_frontend/slot_games/mg_logo.png" alt=""></div>
        <div class="container">
          <div class="platformName">{{item.cnName}}</div>
          <div class="gameAmount">
            <span :class="{gameBalance:true, orange:amountStatus[index]}" @click="getBalance(item, index, 1)">{{(isNaN(parseFloat(item.amount).toFixed(2)) ? 0 : parseFloat(item.amount).toFixed(2)) || '查看余额'}}</span>
            <span class="status">{{item.status ? item.status+'...' : ''}}</span>
          </div>
          <i @click="getBalance(item, index, 1)" :class="{iconfont:true, icongengxin1:true, balanceLoading:isloading[index]}"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AutoPlatform from '../../children/AutoPlatform'
// import { PATH_ONLINEBANKING_PAY, PATH_SELECTPAYCONFIG_PAY } from '@/service/member/member_center.url'

import {
  PATH_GAMEPLATFORM_PAY,
  PATH_WALLATBALANCE_PAY,
  PATH_BALANCE_PAY
} from '@/service/member/member_center.url'

export default {
  name: 'auto_transfer',
  components: {
    // AutoPlatform
  },
  data () {
    return {
      referencePlatform: [
        {cnName: '钱包余额', id: '0', code: 'qbye', amount: '查看余额', status: ''}
      ],
      activeIndex: '', // 选中的平台
      activeIndex1: '', // 选中的平台
      isloading: [], // 加载状态
      amountStatus: [] // 资金显示状态
    }
  },
  mounted () {
    this.getPlatform()
  },
  methods: {
    getPlatform () {
      this.get(PATH_GAMEPLATFORM_PAY, {}).then(res => { // 查询所有平台列表
        res.data.map(obj => {
          this.referencePlatform.push(obj)
        })
        // console.log(this.referencePlatform)
      }, err => {
        console.log(11)
        this.$message.error(err)
      })
    },
    getBalance (item, i, ind) {
      let path = ''
      let payload = {}
      if (i === 0) {
        path = PATH_WALLATBALANCE_PAY // 查询平台余额
      } else {
        path = PATH_BALANCE_PAY // 查询钱包余额
        payload = {
          toProviderCode: item.code,
          toProvidersId: item.id
        }
      }
      this.isloading[i] = true // 刷新按钮选择开始
      this.$set(this.referencePlatform[i], 'status', '正在加载中') // 状态提示开始
      // console.log(this.referencePlatform)
      this.post(path, payload).then(res => {
        console.log(res)
        this.$set(this.isloading, i, false) // 刷新按钮选择结束
        this.$set(this.referencePlatform[i], 'status', '') // 状态提示开始
        this.$set(this.amountStatus, i, true) // 刷新按钮选择结束
        if (i === 0) { // 判断是否是钱包余额还是平台余额
          this.$set(this.referencePlatform[i], 'amount', res.data.amount)
        } else {
          this.$set(this.referencePlatform[i], 'amount', res.data)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .Content{
    margin: 10px auto;
    width: 1300px;
    height: auto;
    background-color: white;
    border-radius: 5px;
    padding: 40px;
    display: flex;
    flex-wrap: wrap;
    .platformList{
    display: flex;
    flex-wrap: wrap;
    .platformItem{
      cursor: pointer;
      width: 220px;
      height: 80px;
      margin-right: 40px;
      margin-bottom: 20px;
      padding: 13px;
      box-sizing: border-box;
      border-radius: 5px;
      border: 1px solid #999999;
      position: relative;
      overflow: hidden;
      .logo{
        width: 50px;
        height: 50px;
        border-radius: 25px;
        overflow: hidden;
        float: left;
        img{
          width: 50px;
          height: 50px;
        }
      }
      .container{
        margin-top: 1px;
        margin-left: 5px;
        float: left;
        span, div {
          line-height: 22px;
          font-size: 15px;
        }
        .gameAmount{
          .gameBalance{
            color: #666666;
            &:hover{
              color: #eb844c;
            }
          }
          .orange{
            color: #eb844c;
          }
          .status{
            position: absolute;
            right: 12px;
            bottom: 2px;
            color: red;
          }
        }
        .icongengxin1 {
          cursor: pointer;
          font-size: 28px;
          position: absolute;
          right: 5px;
          top: 5px;
        }
        .balanceLoading{
          color: #3e3e3e;
          animation: rotate 2s infinite;
        }
      }
    }
    .platformItem:nth-child(5n){
      margin-right: 0;
    }
  }
}
</style>
