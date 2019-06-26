export default {
  routerLinks: [{label: '关于我们', url: '/member/helpCenter/helpMenus/AboutUs', target: '_blank'},
    {label: '存款帮助', url: '/member/helpCenter/helpMenus/DepositTutorial', target: '_blank'},
    {label: '代理中心', url: '/member/helpCenter/helpMenus/AgentCenter', target: '_blank'},
    {label: '用户协议', url: '/member/helpCenter/helpMenus/Agreement', target: '_blank'},
    {label: '转账帮助', url: '#', target: '_blank'},
    {label: '技术援助', url: '#', target: '_blank'},
    {label: '常见问题', url: '/member/helpCenter/helpMenus/Questions', target: '_blank'},
    {label: '取款帮助', url: '/member/helpCenter/helpMenus/ClaimTutorial', target: '_blank'},
    {label: '商务合作', url: '/agent/index', target: '_blank'} // 这里本来是 #,测试用...
  ],
  contacts: [ // 联系与合作
    {icon: 'icondianziyouxiang', label: 'sales@orientalgame.com'},
    {icon: 'iconphone-fill', label: '+63 9169123456'},
    {icon: 'iconqq', label: '客服：2949184297'},
    {icon: 'iconqq', label: '推广: 2810152866'}
  ],
  payments: ['visa', 'master', 'alipay', 'wechat', 'union-pay', 'jd'], // 支付支持
  browsers: ['chrome', 'firefox', 'safari', 'ie', 'uc', 'opera', 'sogou', 'unknow'] // 浏览器支持
}
