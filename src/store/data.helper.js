import store from '@/store'

export function formatConfig (config, result = {}) {
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
