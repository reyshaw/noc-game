const RULES = [ // 游戏规则
  { value: 'zr',
    label: '真人视讯',
    html: '',
    sub: [
      {value: 'OG', label: 'OG'},
      {value: 'BG', label: 'BG'},
      {value: 'BBIN', label: 'BBIN'},
      {value: 'AG', label: 'AG'}
    ]
  },
  { value: 'dz',
    label: '电子游艺',
    html: '',
    sub: [
      {value: 'MG', label: 'MG'},
      {value: 'JDB', label: 'JDB'},
      {value: 'FG', label: 'FG'},
      {value: 'PT', label: 'PT'}
    ]
  },
  { value: 'ty',
    label: '体育游戏',
    html: '',
    sub: [
      {value: 'OG', label: 'OG'},
      {value: 'SB', label: '沙巴'},
      {value: 'HG', label: '皇冠'}
    ]
  },
  { value: 'cp',
    label: '彩票游戏',
    html: '',
    sub: [
      {value: 'OG', label: 'OG'},
      {value: 'VR', label: 'VR'},
      {value: 'BBIN', label: 'BBIN'}
    ]
  },
  { value: 'by',
    label: '捕鱼游戏',
    html: '',
    sub: [
      {value: 'OG', label: 'OG'},
      {value: 'BG', label: 'BG'},
      {value: 'AG', label: 'AG'},
      {value: 'MG', label: 'MG'}
    ]
  },
  { value: 'qp',
    label: '棋牌游戏',
    html: '',
    sub: [
      {value: 'KY', label: 'KY'},
      {value: 'VG', label: 'VG'},
      {value: 'GF', label: 'GF'},
      {value: 'NW', label: 'NW'},
      {value: 'LG', label: 'LG'}
    ]
  },
  { value: 'jj',
    label: '电子竞技',
    html: '',
    sub: [
      {value: 'FY', label: 'FY'},
      {value: 'HC', label: '皇朝'}
    ]
  }
]

const QUESTIONS = [ // 常见问题
  {value: 0, label: '注册与登录'},
  {value: 1, label: '真实姓名'},
  {value: 2, label: '银行卡绑定'},
  {value: 3, label: '找回用户名'},
  {value: 4, label: '找回登录密码'},
  {value: 5, label: '优惠活动'},
  {value: 6, label: '技术相关'}
]

const DEPOSITTUTORIAL = [ // 存款教程
  {value: 0, label: '在线支付'},
  {value: 1, label: '转账支付'},
  {value: 2, label: '扫码支付'},
  {value: 3, label: '钱包支付'},
  {value: 4, label: '点卡支付'}
]

const CLAIMTUTORIAL = [ // 取款教程
  {value: 0, label: '取款稽核'},
  {value: 1, label: '取款流程'}
]

const SAFETUTORIAL = [ // 防劫持教程
  {value: 0, label: 'windows系统'},
  {value: 1, label: 'Mac系统'},
  {value: 2, label: 'IOS系统'},
  {value: 3, label: 'Android系统'},
  {value: 4, label: '小米路由'},
  {value: 5, label: '极路由'},
  {value: 6, label: '其他'}
]

export default {
  RULES,
  QUESTIONS,
  DEPOSITTUTORIAL,
  CLAIMTUTORIAL,
  SAFETUTORIAL
}
