/** 网关 **/
let OGWLS_GAME_API = '/ogwls-game-api' // 游戏patrick
let OGWLS_USER_CLIENT = '/ogwls-user-client' // 用户相关项目
let OGWLS_PAY = '/ogwls-pay' // 支付项目

if (process.env.NODE_ENV === 'production') {
  OGWLS_USER_CLIENT = '/ogwls-user-client'
  OGWLS_GAME_API = '/ogwls-game-api'
  OGWLS_PAY = '/ogwls-pay'
}

export {
  OGWLS_GAME_API,
  OGWLS_USER_CLIENT,
  OGWLS_PAY
}
