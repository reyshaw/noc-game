<template>
  <div class="recommend-box">
    <div class="content">
      <h1>邀请好友 <span>累计存款<strong>￥{{amountAdd}}</strong>元 </span><span>已成功邀请好友<strong>{{total}}</strong>人</span></h1>
      <div class="flex-box">
        <div class="left">
          <div class="top">
            <h2>好友邀请码:</h2>
            <p class="inviteCode"
               :data-clipboard-text="invite.inviteCode">
              <input type="text" disabled="disabled" :value="invite.inviteCode">
              <button v-pointer @click="handleCopy('.inviteCode')">复制</button>
            </p>
            <h2>好友邀请链接:</h2>
            <p class="inviteLink"
               :data-clipboard-text="invite.inviteLink">
              <input type="text" disabled="disabled" :value="invite.inviteLink">
              <button v-pointer @click="handleCopy('.inviteLink')">复制</button>
            </p>
          </div>
          <div class="bottom">
            <h2>好友邀请二维码:</h2>
            <div class="code-box">
              <div class="code" v-pointer><img :src="codeURL"/> </div>
              <div class="download-box">
                <p><i>指尖推荐好友</i></p>
                <p>扫一扫 二维码</p>
                <p>朋友好 我也好</p>
                <p><button v-pointer @click="download">下载</button></p>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <h2>已邀请好友列表:</h2>
          <el-table
            :data="tableData"
            height="350px"
            style="width: 100%">
            <el-table-column
              prop="inviteMemberAccount"
              label="邀请好友"
              width="180">
            </el-table-column>
            <el-table-column
              prop="registerTime"
              label="注册时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="lastLoginTime"
              label="最后登录时间">
            </el-table-column>
            <el-table-column
              prop="totalDepositAmount"
              label="累计存款金额">
            </el-table-column>
            <el-table-column
              prop="depositTime"
              label="最后存款时间">
            </el-table-column>
          </el-table>
          <pagination
            @page-num-change="onPageNumChange"
            @page-size-change="onPageSizeChange"
            :total="total">
          </pagination>
        </div>
      </div>
      <div class="flex-box">
        <div class="up">
          <div class="left-pan">
            <h2>邀请 2 位好友， 各奖励 100 元 ！</h2>
            <p>如有新会员加入，您就可以领取 100 元</p>
            <p>好友每天阅读获得 540 元，您即可获得当天的金币奖励</p>
          </div>
          <ul>
            <li v-for="(rule, index) in ruleList" :key="index">
              <div class="inner" v-pointer @click="getReward(rule, index)" :class="{already: rule.applyStatus === 2, wait: rule.applyStatus === 0}">
                <p>{{rule.applyStatus === 2 ? '已领取' : (rule.applyStatus === 1 ? '领取' : '未达条件')}}</p>
                <p><strong>￥</strong></p>
                <p>{{rule.giftAmount}}元</p>
              </div>
            </li>
            <li class="blank" v-for="item in 6-ruleList.length" :key="item+ruleList.length">￥</li>
          </ul>
          <button v-pointer @click="getReward">一键领取</button>
        </div>
        <div class="down">
          <div class="left-pan">
            <h2>温馨提示</h2>
            <p>活动期间, 您邀请朋友来玩游戏可免费获得 1888 元, 请赶快使出召唤术, 召集您的朋友们一起玩游戏。</p>
            <button @click="goToActivity">活动详情</button>
          </div>
          <div class="table-box">
            <table>
              <thead>
                <tr>
                  <th>邀请人数</th>
                  <th>赠送金额</th>
                  <th>流水要求</th>
                  <th>被推荐人存款要求</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(rule, index) in ruleList" :key="index">
                  <td>{{rule.inviteNums}}人</td>
                  <td>{{rule.giftAmount}}元</td>
                  <td>{{rule.promotionAuditing}}倍</td>
                  <td>{{rule.referralDemandDepositAmount}}元/人</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pageMix from '@/mixins/page.mix'
import Pagination from '@/components/noc-pagination'
import handleCopy from '@/assets/scripts/clipboard'
import {
  PATH_RECOMMEND,
  PATH_REWORD_GET
} from '@/service/member/member_center.url'
export default {
  name: 'recommend_friends',
  mixins: [pageMix],
  components: {
    Pagination
  },
  data () {
    return {
      listURL: PATH_RECOMMEND,
      amountAdd: '', // 累计存款
      timeZone: '',
      codeURL: '',
      downloadURL: '',
      invite: {
        inviteCode: '',
        inviteLink: ''
      },
      ruleList: [],
      isFetching: false
    }
  },
  created () {
    let self = this
    this.fetchList(function (data) {
      let _data = data
      self.invite = _data.filter.recommendFriendVo
      self.ruleList = _data.filter.ruleList
      self.codeURL = _data.filter.recommendFriendVo.qrImgUrl
      self.amountAdd = data.filter.recommendFriendVo.totalAmount
    })
  },
  methods: {
    handleCopy,
    download () {
      window.open(this.codeURL)
    },
    goToActivity () {
      alert(`跳到具体的活动页面, 具体的页面还还有!`)
    },
    getReward (item, index) { // 领取奖励
      if (this.isFetching) {
        return
      }
      if (Number(item.applyStatus) === 2) {
        this.$message.error('已领取过，请勿重复领取')
      } else if (Number(item.applyStatus) === 0) {
        this.$message.warning('尚未达到条件')
      } else {
        this.isFetching = true
        this.post(PATH_REWORD_GET, {pmcId: item.pmcId, conditionId: item.conditionId}).then(res => {
          this.isFetching = false
          if (index || index === 0) {
            this.$message.success('领取成功')
            this.ruleList[index]['applyStatus'] = 2
          } else { // 一键领取
            if (res.status) {
              this.$message.success('全部领取成功')
              this.ruleList.forEach(item => {
                if (item.applyStatus === 1) {
                  item.applyStatus = 2
                }
              })
            }
          }
        }, err => {
          this.isFetching = false
          this.$message.error(err)
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.recommend-box {
  .content {
    width: 98%;
    margin: 10px auto;
    background: #fff;
    height: 1110px;
    box-sizing: border-box;
    h1 {
      font-size: 16px;
      line-height: 50px;
      height: 50px;
      text-indent: 25px;
      box-sizing: border-box;
      padding-right: 40px;
      color: #636262;
      span {
        float: right;
        font-size: 14px;
        strong {
          font-weight: bold;
          margin: 0 2px;
        }
      }
    }
    .flex-box {
      width: 96%;
      margin: 10px auto;
      height: 500px;
      margin-bottom: 20px;
      padding: 10px;
      box-sizing: border-box;
      .left {
        width: 435px;
        float: left;
        .top, .bottom {
          border: 2px solid #afcbfa;
          height: 205px;
          border-radius: 15px;
          background: #d7e2f7;
          box-sizing: border-box;
          padding: 10px 25px;
          h2 {
            font-size: 14px;
            color: #222;
            line-height: 35px;
            margin-bottom: 10px;
          }
          input{
            display: inline-block;
            width: 300px;
            height: 40px;
            border: none;
            outline: none;
            box-sizing: border-box;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            font-size: 14px;
            text-indent: 15px;
            color: #222;
          }
          button {
            width: 58px;
            height: 40px;
            border: none;
            outline: none;
            background: #3b84fb;
            color: #fff;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
          }
        }
        .bottom {
          height: 250px;
          margin-top: 15px;
          .code-box {
            height: 170px;
            box-sizing: border-box;
            .code {
              width: 170px;
              height: 170px;
              box-sizing: border-box;
              border: 1px dashed #b7b7b7;
              border-radius: 5px;
              float: left;
            }
            .download-box {
              margin-left: 20px;
              text-align: center;
              box-sizing: border-box;
              padding-top: 8px;
              p {
                line-height: 35px;
                font-size: 20px;
                color: #222;
                i {
                  font-style: italic;
                  font-size: 14px;
                  letter-spacing: 6px;
                }
                button {
                  width: 140px;
                  height: 35px;
                  border-radius: 15px;
                }
              }
            }
          }
        }
      }
      .right { /**右边部分**/
        float: right;
        border: 2px solid #afcbfa;
        width: 880px;
        height: 470px;
        border-radius: 15px;
        background: #d7e2f7;
        box-sizing: border-box;
        padding: 10px 25px;
        h2 {
          font-size: 14px;
          color: #222;
          line-height: 35px;
          margin-bottom: 10px;
        }
      }
      &:last-child { /**下面部分**/
        border: 2px solid #afcbfa;
        border-radius: 15px;
        height: 500px;
        background: #d7e2f7;
        padding: 45px;
        .up {
          height: 115px;
          width: 100%;
          margin-bottom: 30px;
          div.left-pan{
            float: left;
            width: 350px;
            margin-left: 20px;
            h2 {
              font-size: 14px;
              color: #222;
              margin-top: 15px;
              margin-bottom: 5px;
            }
            p {
              font-size: 14px;
              color: #636262;
              line-height: 30px;
            }
          }
          ul {
            float: left;
            li {
              width: 97px;
              height: 113px;
              border-radius: 5px;
              float: left;
              margin-left: 17px;
              box-sizing: border-box;
              div.inner {
                width: 100%;
                height: 100%;
                background: #dc5035;
                border-radius: 5px;
                box-sizing: border-box;
                padding-top: 10px;
                p {
                  font-size: 14px;
                  color: #e8ea35;
                  font-weight: bold;
                  text-align: center;
                  strong {
                    display: inline-block;
                    width: 35px;
                    height: 35px;
                    background: #f6d49a;
                    border-radius: 50%;
                    font-size: 20px;
                    line-height: 35px;
                    margin: 6px;
                    color: #e47322;
                  }
                }
                &.already {
                  background: gray;
                  p {
                    color: #fff;
                  }
                }
                &.wait {
                  background: brown;
                }
              }
              &.blank {
                font-size: 55px;
                color: #9b9b9b;
                text-align: center;
                line-height: 113px;
                border: 1px dashed #b7b7b7;
              }
            }
          }
          button {
            width: 193px;
            height: 113px;
            background: #3a82f7;
            margin-top: 1px;
            border: 1px solid #2b5fb5;
            outline: none;
            font-size:32px;
            color: #fff;
            font-weight: bold;
            margin-left: 15px;
          }
        }
        .down {
          height: 260px;
          width: 100%;
          background: #596687;
          border-radius: 5px;
          overflow: hidden;
          .left-pan {
            width: 200px;
            float: left;
            height: 100%;
            color: #fff;
            padding: 20px;
            box-sizing: border-box;
            h2 {
              margin-top: 22px;
              margin-bottom: 20px;
            }
            p {
              line-height: 22px;
            }
            button {
              width: 150px;
              height: 30px;
              color: #fff;
              background: #3a82f7;
              border-radius: 5px;
              border: none;
              margin-top: 20px;
              &:hover {
                cursor: pointer;
              }
            }
          }
          .table-box {
            width: 1050px;
            background: #fff;
            height: 260px;
            /*overflow: hidden;*/
            float: right;
            overflow: auto;
            table {
              width: 100%;
              th {
                background: #596687;
                color: #fff;
                font-size: 14px;
                text-align: center;
              }
              td {
                line-height: 44px;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
}
</style>
