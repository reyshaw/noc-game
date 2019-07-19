import {
  OGWLS_GAME_API,
  OGWLS_USER_CLIENT
} from '@/service/req.getway'

// 验证码的路径比较特别
let baseImgUrl = process.env.BASE_URL + OGWLS_USER_CLIENT

/** ------------------------------ 注册登陆(auth) ---------------------------- **/
export const PATH_GETITEMS_REGISTER = OGWLS_USER_CLIENT + '/manage/systemMemberRegisterConfig/memberRegisterConfigList' // 获取注册配置项
export const PATH_SEND_EMAIL = OGWLS_USER_CLIENT + '/sendEmail' // 注册接口发送邮箱
export const PATH_REGISTER_MEMBER = OGWLS_USER_CLIENT + '/manage/login/registerMember' // 会员注册接口
export const PATH_REGISTER_AGENT = OGWLS_USER_CLIENT + '/manage/login/registerAgent' // 代理注册接口
export const PATH_VERIFYTYPE_LIST = OGWLS_USER_CLIENT + '/manage/systemVerifycodeManagement/verifycodeManagementList' // 获取验证码类型
export const PATH_SELECTMEMCONFIG_LOGIN = OGWLS_USER_CLIENT + '/system/registerConfig/selectMemConfig' // 获取是否需要验证码
export const PATH_VERIFYCODE_IMAGE = baseImgUrl + '/manage/verify/captchaImage' // 获取图片验证码路径
export const PATH_SELECTPAYCONFIG_PAY = OGWLS_USER_CLIENT + '/manage/pay/selectPayConfig' // 会员支付配置信息查询
export const PATH_CARDLIST_PAY = OGWLS_USER_CLIENT + '/manage/memberCard/memberCardList' // 会员银行卡列表
export const PATH_WITHDRAW_PAY = OGWLS_USER_CLIENT + '/members/withdraw' // 会员银行卡列表

export const PATH_MEMBERLOGIN_LOGIN = OGWLS_USER_CLIENT + '/manage/login/memberLogin' // 登录接口
export const PATH_LOGOUT_LOGIN = OGWLS_USER_CLIENT + '/manage/login/logout' // 登出

/** ------------------------------ 电子游戏(games) ---------------------------- **/
export const PATH_GAMEPROVIDERSLIST_GAME = OGWLS_GAME_API + '/member/game/game-providers-list' // 获取商户配置的游戏厂商列表
export const PATH_GAMEPLIST_GAME = OGWLS_GAME_API + '/member/game/game-list' // 获取指定平台的游戏列表
export const PATH_LOGINURL_GAME = OGWLS_GAME_API + '/member/game/game-login-url' // 获取指定游戏的跳转链接
export const PATH_HOTGAMES_GAME = OGWLS_GAME_API + '/member/game/hot-games' // 获取热门游戏
export const PATH_TAGLIST_GAME = OGWLS_GAME_API + '/member/game/game-types' // 根据游戏厂商获取该游戏厂商支持的游戏类型(标签)
export const PATH_LOBBYYRL_GAME = OGWLS_GAME_API + '/member/game/game-providers-gamelist' // 获取游戏厂商大厅的跳转链接

/** 首页 **/
export const PATH_INDEX_GAME = OGWLS_GAME_API + '/member/game/index-game-providers'

/** 优惠活动 **/
export const PATH_ACTI_LIST = OGWLS_USER_CLIENT + '/queryPromotionActivityList'

/** 轮询 **/
export const PATH_POLLING = OGWLS_USER_CLIENT + '/memberNotifacations'
