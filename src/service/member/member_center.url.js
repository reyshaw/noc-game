import {
  OGWLS_USER_CLIENT,
  OGWLS_GAME_API,
  OGWLS_PAY
} from '@/service/prefix.path'

/** 财务中心(pay) **/
export const PATH_SELECTPAYCONFIG_PAY = OGWLS_USER_CLIENT + '/manage/pay/selectPayConfig' // 所有支付渠道配置列表
export const PATH_CARDLIST_PAY = OGWLS_USER_CLIENT + '/manage/memberCard/memberCardList' // 会员银行卡列表
export const PATH_WITHDRAW_PAY = OGWLS_USER_CLIENT + '/members/withdraw' // 取款接口
export const PATH_ONLINEBANKING_PAY = OGWLS_PAY + '/pay/onlineBanking' // 网银渠道
export const PATH_SCANPAY_PAY = OGWLS_PAY + '/pay/scanPay' // 在线第三方扫码支付
export const PATH_OFFLINESCANPAY_PAY = OGWLS_PAY + '/offlinePay/offlineScanPay' // 在线第三方扫码支付
export const PATH_TRANSFER_PAY = OGWLS_PAY + '/member/transfer/transfer' // 上下分
export const PATH_GAMEPLATFORM_PAY = OGWLS_GAME_API + '/member/game/game-providers/1' // 平台列表
export const PATH_BALANCE_PAY = OGWLS_USER_CLIENT + '/member/transfer/balance' // 获取平台余额
export const PATH_WALLATBALANCE_PAY = OGWLS_USER_CLIENT + '/member/getBalance' // 获取钱包余额
export const PATH_WALLATTOTRANSFOR_PAY = OGWLS_USER_CLIENT + '/member/transfer/transferOut' // 从钱包转出平台
export const PATH_TRANSFOR_PAY = OGWLS_USER_CLIENT + '/member/transfer/interTransformation' // 平台互转
export const PATH_TRANSFORTOWALLAT_PAY = OGWLS_USER_CLIENT + '/member/transfer/transferIn' // 从平台转入钱包
export const PATH_RECOVERY_PAY = OGWLS_USER_CLIENT + '/member/transfer/transferRecovery/1' // 一键回收
export const PATH_DEPOSITOFFER_PAY = OGWLS_USER_CLIENT + '/manage/pay/depositOffer' // 会员存款优惠金额

/** 自助中心(help) **/
export const PATH_SELECTWATER_CLIENT = OGWLS_USER_CLIENT + '/record/selectWater' // 返水列表
export const PATH_GETWATER_CLIENT = OGWLS_USER_CLIENT + '/record/acquisitionBackWater' // 领取返水
export const PATH_GETOFFER_CLIENT = OGWLS_USER_CLIENT + '/member/getTransferBalance' // 领取优惠
export const PATH_GETCHIPTOTAL_CLIENT = OGWLS_USER_CLIENT + '/member/getChipTotal' // 获取筹码/优惠卷 的总数
export const PATH_GETCOUPON_CLIENT = OGWLS_USER_CLIENT + '/member/getOfferBalance' // 获取会员存款优惠卷
export const PATH_GETCHIPRECORD_CLIENT = OGWLS_USER_CLIENT + '/member/getChipRecord' // 获取会员筹码记录

/** 个人中心(member) **/
export const PATH_LIST_CAPITAL = OGWLS_USER_CLIENT + '/record/capital' // 资金记录
export const PATH_LIST_BET = OGWLS_GAME_API + '/game/betting' // 投注记录
export const PATH_LIST_DISCOUNT = OGWLS_USER_CLIENT + '/record/discount' // 优惠记录
export const PATH_LIST_LUCKY = OGWLS_USER_CLIENT + '/record/luckyRecord' // 抽奖记录
export const PATH_LIST_INTEGRAL = OGWLS_USER_CLIENT + '/record/integralRecord' // 积分记录
export const PATH_BANKCARD_ADDCARDS = OGWLS_USER_CLIENT + '/manage/memberCard/memberCardSave' // 绑定银行卡
export const PATH_BANKCARD_CONFIG = OGWLS_USER_CLIENT + '/bankcardManagementList' // 银行卡默认配置项
export const PATH_BANKCARD_UNBINDCARDS = OGWLS_USER_CLIENT + '/manage/memberCard/memberCardDel' // 解绑银行卡
export const PATH_BANKCARD_SETDEFAULT = OGWLS_USER_CLIENT + '/manage/memberCard/updateMemberCard' // 设置默认银行卡

/** 消息公告 **/
export const PATH_LIST_MSG = OGWLS_USER_CLIENT + '/manage/siteMessageExtra/siteMessageExtraList' // 系统消息列表
export const PATH_LIST_PUBLIC = OGWLS_USER_CLIENT + '/manage/siteBulletin/siteBulletinList' // 公告消息列表
export const PATH_MSG_READ = OGWLS_USER_CLIENT + '/manage/siteMessageExtra/updateSiteMessageExtra' // 系统消息阅读
export const PATH_PUBLIC_READ = OGWLS_USER_CLIENT + '/manage/siteBulletin/updateSiteBulletin' // 公告消息阅读
export const PATH_MSG_DELETE = OGWLS_USER_CLIENT + '/manage/siteMessageExtra/siteMessageExtraRemove' // 系统消息删除
export const PATH_PUBLIC_DELETE = OGWLS_USER_CLIENT + '/manage/siteBulletin/siteBulletinExtraRemove'// 公告消息删除

/** 修改密码**/
export const PATH_CHANGE_PROFILE = OGWLS_USER_CLIENT + '/manage/memberInfo/updateMember' // 修改个人基本信息
export const PATH_CHANGEPWD_LOGIN = OGWLS_USER_CLIENT + '/manage/memberInfo/updateMemberPwd' // 修改登录密码
export const PATH_CHANGEPWD_CLAIM = OGWLS_USER_CLIENT + '/manage/memberInfo/updateMemberWithdrawalPwd' // 修改取款密码

/** 推荐好友 **/
export const PATH_RECOMMEND = OGWLS_USER_CLIENT + '/manage/inviteFriendInfo/inviteFriendInfoList' // 推荐好友信息
export const PATH_QR_CODE = OGWLS_USER_CLIENT + '/manage/verify/getQrCodeImg' // 二维码
export const PATH_REWORD_GET = OGWLS_USER_CLIENT + '/manage/inviteFriendInfo/applyPromotionCoupon' // 领取奖励
