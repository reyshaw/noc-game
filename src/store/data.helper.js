import store from '@/store'

export function formatConfig1 (config, result = {}) {
  result = {
    regItem: [] // 注册配置
  }
  const [list] = config.list
  const registerItems = list.registerItems.split(',') // 是否必输
  let registerList = []
  if (store.state.role === 'member') { // 会员
    result.showVerify = !config.filter.verifyCodelist[0].verifyCodeShowStatus
    result.verifyType = config.filter.verifyCodelist[0].verifyCodeMode
    result.type = config.filter.verifyCodelist[0].verifyCodeType
    registerList = config.filter.registerList
  } else { // 代理
    result.showVerify = !list.verifyCodeStatus
    result.verifyType = '1'
    result.type = '0,1,2,3'
    registerList = config.filter
  }
  // const {registerList, verifyCodelist} = config.filter // 注册项伪数组, 验证码是否显示项
  // const {verifyCodeShowStatus, verifyCodeMode, verifyCodeType} = verifyCodelist[0]

  for (let val of Object.values(registerItems)) {
    const _val = val.split(':')
    result.regItem.push({
      key: _val[1],
      label: registerList[_val[1]],
      required: Boolean(_val[0] / 1)
    })
  }
  return result
}

export function formatConfig () {
  let registerList = []
  if (store.state.role === 'member') { // 会员
    registerList = {
      form: [
        {label: '登录账号', model: 'memberAccount', type: 'text', isRequired: true},
        {label: '登录密码', model: 'memberPassword', type: 'password', isRequired: true},
        {label: '确认密码', model: 'memberConfirmPassword', type: 'password', isRequired: true},
        {label: '真实姓名', model: 'memberRealName', type: 'text', isRequired: true},
        {label: '出生日期', model: 'memberDateBirth', type: 'datapicker', isRequired: true},
        {label: '手机号码', model: 'memberMobile', type: 'text', isRequired: true, hasCode: true},
        {label: '邮箱地址', model: 'memberEmail', type: 'text', isRequired: true, hasCode: true},
        {label: '取款密码', model: 'withdrawalPassword', type: 'text', isRequired: true},
        {label: '推广码', model: 'promotionCode', type: 'text', isRequired: true},
        {label: '邀请码', model: 'inviteCode', type: 'text', isRequired: true},
        {label: '是否开启注册验证码', model: 'registerCode', type: 'text', isRequired: true}
      ],
      show_verify: true,
      verify_type: 2,
      use_type: 2,
      merchant_id: 1038,
      shareholder_id: 50
    }
  } else { // 代理
    registerList = {
      form: [
        {label: '登录账号', model: 'agentAccount', type: 'input', isRequired: true},
        {label: '登录密码', model: 'agentPassword', type: 'password', isRequired: true},
        {label: '确认密码', model: 'agentConfirmPassword', type: 'password', isRequired: true},
        {label: '真实姓名', model: 'agentRealname', type: 'input', isRequired: true},
        {label: '推广域名', model: 'promotionZoneUrl', type: 'datapicker', isRequired: true},
        {label: '其他推广域名', model: 'otherPromotionZoneUrl', type: 'input', isRequired: true},
        {label: '手机号码', model: 'agentMobile', type: 'password', isRequired: true},
        {label: '微信号码', model: 'agentWebchart', type: 'input', isRequired: true},
        {label: '电子邮箱', model: 'agentEmail', type: 'input', isRequired: true},
        {label: '取款银行', model: 'withdrawalBank', type: 'input', isRequired: true},
        {label: '银行账户', model: 'bankAccount', type: 'input', isRequired: true},
        {label: '开户支行', model: 'openBranchAddress', type: 'input', isRequired: true},
        {label: '取款密码', model: 'withdrawalPassword', type: 'input', isRequired: true},
        {label: '是否邮箱验证码', model: 'ifEmailVerify', type: 'input', isRequired: true},
        {label: '是否手机验证码', model: 'ifPhoneVerify', type: 'input', isRequired: true}
      ],
      show_verify: true,
      verify_type: 2,
      use_type: 2,
      merchant_id: 1038,
      shareholder_id: 50
    }
  }
  // const {registerList, verifyCodelist} = config.filter // 注册项伪数组, 验证码是否显示项
  // const {verifyCodeShowStatus, verifyCodeMode, verifyCodeType} = verifyCodelist[0]

  // for (let val of Object.values(registerItems)) {
  //   const _val = val.split(':')
  //   result.regItem.push({
  //     key: _val[1],
  //     label: registerList[_val[1]],
  //     required: Boolean(_val[0] / 1)
  //   })
  // }
  return registerList
}
