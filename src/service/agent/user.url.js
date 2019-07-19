import {OGWLS_USER_CLIENT} from '@/service/req.getway'

// export const CONFIG = `${OGWLS_USER_CLIENT}/manage/systemProxyRegisterConfig/proxyRegisterConfigList`
export const CONFIG = `${OGWLS_USER_CLIENT}/system/registerConfig/registerConfig`
export const LOGIN = `${OGWLS_USER_CLIENT}/manage/login/agentLogin`
export const CHANGE_PWD = `${OGWLS_USER_CLIENT}/manage/memberInfo/updateAgentLoginPwd`

export default {
  CONFIG,
  LOGIN,
  CHANGE_PWD
}
