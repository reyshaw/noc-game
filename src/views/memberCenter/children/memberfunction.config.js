// 会员或代理的菜单
export default {
  member: [
    {submenu: '财务中心', // 会员
      botmenu: [{title: '额度转换', route: 'balanceTransfer'},
        {title: '存款专区', route: 'deposit'},
        {title: '取款专区', route: 'withdrawal'},
        {title: '资金记录', route: 'fundRecord'},
        {title: '投注记录', route: 'betRecord'},
        {title: '优惠记录', route: 'promotionRecord'},
        {title: '抽奖记录', route: 'drawVolumeRecord'},
        {title: '积分记录', route: 'integralRecord'}]},
    {submenu: '自助中心',
      botmenu: [{title: '即时返水', route: 'returnWater'},
        {title: '救援金', route: 'rescueGold'},
        {title: '优惠券', route: 'promotionCode'},
        {title: '游戏筹码', route: 'chips'},
        {title: '自助催账', route: 'demandPayment'}]},
    {submenu: '个人中心',
      botmenu: [{title: '个人资料', route: 'personalData'},
        {title: '修改密码', route: 'changePassword'},
        {title: '银行卡管理', route: 'bankcardManage'},
        {title: '消息公告', route: 'notices'},
        {title: '推荐好友', route: 'recommendFriends'}]
    }],
  agent: [
    {submenu: '团队中心',
      botmenu: [{title: '团队概览', route: 'agent_overview'},
        {title: '团队管理', route: 'agent_management'},
        {title: '团队报表', route: 'agent_reports'},
        {title: '推广管理', route: 'agent_popularize'}]},
    {submenu: '个人中心',
      botmenu: [{title: '提取佣金', route: 'agent_withdrawal'},
        {title: '个人资料', route: 'agent_personalData'},
        {title: '安全设置', route: 'agent_changePassword'},
        {title: '我的银行卡', route: 'agent_bankcardManage'},
        {title: '消息公告', route: 'agent_notices'}]
    }]
}
