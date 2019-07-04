import {generateRoute} from '@/assets/scripts/utils'

const _import = require('./_import_' + process.env.NODE_ENV)._import

export default {
  path: '/member', // 首页
  component: _import('Layout'),
  redirect: {name: 'index'},
  children: [
    ...generateRoute([ // 该方法不需要传前缀
      'home/index', // 首页首屏
      'videos', // 真人娱乐
      'electronic', // 电子游艺
      'sports', // 体育竞技
      'lottery', // 彩票游戏
      'fishing', // 捕鱼游戏
      'chess', // 棋牌游戏
      'eSports', // 电子竞技
      'promotion' // 优惠活动
    ], [], _import),
    { path: 'register', name: 'memberRegister', component: _import('auth/Register') }, // 注册
    { path: 'memberCenter', // 会员中心
      name: 'memberCenter',
      component: _import('memberCenter/MemberCenter'),
      redirect: {name: 'balanceTransfer'},
      children: [
        { path: 'financeCenter', // 财务中心仅包裹
          name: 'financeCenter',
          component: _import('memberCenter/FinanceCenter'),
          redirect: {name: 'balanceTransfer'},
          children: [
            ...generateRoute([
              'balanceTransfer/balanceTransfer', // 额度转换
              'deposite/deposit', // 存款专区
              'withdrawal/withdrawal', // 取款专区
              '/fundRecord', // 资金记录
              '/betRecord', // 投注记录
              '/promotionRecord', // 优惠记录
              '/drawVolumeRecord', // 抽奖记录
              '/integralRecord' // 积分记录
            ], ['memberCenter/financeCenter/'], _import)
          ]
        },
        { path: 'selfHelpCenter', // 自助中心仅包裹
          component: _import('memberCenter/SelfHelpCenter'),
          redirect: {name: 'returnWater'},
          children: [
            ...generateRoute([
              '/returnWater', // 即时返水
              '/rescueGold', // 救援金
              '/promotionCode', // 优惠码
              '/chips', // 游戏筹码
              'demandPayment' // 自助催账
            ], ['memberCenter/selfHelpCenter/'], _import)
          ]
        },
        { path: 'personalCenter', // 个人中心仅包裹
          component: _import('memberCenter/PersonalCenter'),
          redirect: {name: 'personalData'},
          children: [
            ...generateRoute([
              '/personalData', // 个人资料
              '/changePassword', // 修改密码
              'bankcardManage', // 银行卡管理
              'notices', // 消息公告
              '/recommendFriends' // 推荐好友
            ], ['memberCenter/personalCenter/'], _import)
          ]
        }
      ]
    },
    {
      path: 'helpCenter', // 帮助中心
      name: 'helpCenter',
      component: _import('helpCenter/Index'),
      redirect: {name: 'helpMenus'},
      children: [
        { path: 'helpMenus',
          name: 'helpMenus',
          redirect: {name: 'AboutUs'},
          component: _import('helpCenter/Menus'), /* redirect: {name: 'balanceTransfer'}, */
          children: [
            ...generateRoute([
              '/AboutUs', // 关于我们
              '/Privacy', // 用户隐私
              '/Agreement', // 用户协议
              '/Responsibility', // 博彩责任
              '/Statement', // 免责声明
              '/AgentCenter', // 代理中心
              '/ContactUs' // 联系我们
            ], ['helpCenter/comp/'], _import),
            { path: 'Rules', name: 'Rules', component: _import('helpCenter/comp/Tabs') }, // 游戏规则
            { path: 'Questions', name: 'Questions', component: _import('helpCenter/comp/Tabs') }, // 常见问题
            { path: 'DepositTutorial', name: 'DepositTutorial', component: _import('helpCenter/comp/Tabs') }, // 存款教程
            { path: 'ClaimTutorial', name: 'ClaimTutorial', component: _import('helpCenter/comp/Tabs') }, // 取款教程
            { path: 'SafeTutorial', name: 'SafeTutorial', component: _import('helpCenter/comp/Tabs') } // 防劫持教程
          ]
        }
      ]
    }
  ]
}
