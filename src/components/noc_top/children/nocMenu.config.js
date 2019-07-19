import i18n from '@/assets/scripts/i18n'
// import store from '@/store/share.store'
// let menu = []
// if (store.state.loginRole === 'member') {
//   menu = [ // 会员菜单
//     {label: `${i18n.t(`top.home`)}`, type: 'route', value: 'index'},
//     {label: `${i18n.t(`top.platform_features`)}`, type: 'link', value: 'https://www.orientalgame.com/zh/product/wls/'},
//     {label: `${i18n.t(`top.video`)}`, type: 'preLink', value: 'https://video.hvse274.com/ErrorHandlers/restrictcookie.aspx'},
//     {label: `${i18n.t(`top.sport`)}`, type: 'preLink', value: 'https://og-sports.oriental-game.com/betconstruct/play?AuthToken=bjJjaN8XpbeDWZjL9IFSUt94&lang=zhh'},
//     {label: `${i18n.t(`top.live_game`)}`, type: 'route', value: 'videos'},
//     {label: `${i18n.t(`top.electronic_game`)}`, type: 'route', value: 'electronic'},
//     {label: `${i18n.t(`top.sports_competition`)}`, type: 'route', value: 'sports'},
//     {label: `${i18n.t(`top.lottery_games`)}`, type: 'route', value: 'lottery'},
//     {label: `${i18n.t(`top.fishing_game`)}`, type: 'route', value: 'fishing'},
//     {label: `${i18n.t(`top.tabel_game`)}`, type: 'route', value: 'chess'},
//     {label: `${i18n.t(`top.e_sports`)}`, type: 'route', value: 'eSports'},
//     {label: `${i18n.t(`top.promotion`)}`, type: 'route', value: 'promotion'},
//     {label: `${i18n.t(`top.demo`)}`, type: 'route', value: 'promotion'}
//   ]
// } else {
//   menu = [
//     {label: '官网首页', type: 'route', value: 'index'},
//     {label: '代理首页', type: 'route', value: 'agent_index'},
//     {label: '代理加盟', type: 'route', value: 'agent_join'},
//     {label: '佣金方案', type: 'route', value: 'agent_commissionPlan'},
//     {label: '佣金支付', type: 'route', value: 'agent_commissionPay'}
//   ]
// }
export default {
  member_menu: [
    {label: `${i18n.t(`top.home`)}`, type: 'route', value: 'index'},
    {label: `${i18n.t(`top.platform_features`)}`, type: 'link', value: 'https://www.orientalgame.com/zh/product/wls/'},
    {label: `${i18n.t(`top.video`)}`, type: 'preLink', value: {gameId: 1, providerId: 1}},
    {label: `${i18n.t(`top.sport`)}`, type: 'preLink', value: 'https://og-sports.oriental-game.com/betconstruct/play?AuthToken=bjJjaN8XpbeDWZjL9IFSUt94&lang=zhh'},
    {label: `${i18n.t(`top.live_game`)}`, code: 'live', type: 'route', value: 'videos'},
    {label: `${i18n.t(`top.electronic_game`)}`, code: 'rng', type: 'route', value: 'electronic'},
    {label: `${i18n.t(`top.sports_competition`)}`, code: 'sport', type: 'route', value: 'sports'},
    {label: `${i18n.t(`top.lottery_games`)}`, code: 'lottery', type: 'route', value: 'lottery'},
    {label: `${i18n.t(`top.fishing_game`)}`, code: 'fish', type: 'route', value: 'fishing'},
    {label: `${i18n.t(`top.tabel_game`)}`, code: 'cardgame', type: 'route', value: 'tableGames'},
    {label: `${i18n.t(`top.e_sports`)}`, code: 'ESports', type: 'route', value: 'eSports'},
    {label: `${i18n.t(`top.promotion`)}`, code: 'live', type: 'route', value: 'promotion'},
    {label: `${i18n.t(`top.demo`)}`, code: 'live', type: 'route', value: 'dome'}
  ],
  submenuList: {},
  agent_menu: [
    {label: '官网首页', type: 'route', value: 'index'},
    {label: '代理首页', type: 'route', value: 'agent_index'},
    {label: '代理加盟', type: 'route', value: 'agent_join'},
    {label: '佣金方案', type: 'route', value: 'agent_commissionPlan'},
    {label: '佣金支付', type: 'route', value: 'agent_commissionPay'}
  ],
  hidden: true
}
