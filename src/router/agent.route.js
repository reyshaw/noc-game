import {generateRoute} from '@/assets/scripts/utils'

const _import = require('./_import_' + process.env.NODE_ENV)._import
const __import = require('./_import_' + process.env.NODE_ENV).__import

export default { path: '/agent', // 首页
  component: _import('Layout'),
  redirect: {name: 'agent_index'},
  children: [
    ...generateRoute([
      '/index', // 首页首屏
      '/join', // 代理加盟
      '/commissionPlan', // 佣金方案
      '/commissionPay' // 佣金支付
    ], ['home/', 'agent_'], __import),
    { path: 'register', name: 'agentRegister', component: _import('auth/Register') }, // 注册
    { path: 'agentCenter', // 代理中心
      name: 'agent_agentCenter',
      component: _import('memberCenter/MemberCenter'),
      redirect: {name: 'agent_team'},
      children: [
        { path: 'team', // 财务中心仅包裹
          name: 'agent_team',
          component: _import('memberCenter/FinanceCenter'),
          redirect: {name: 'agent_overview'},
          children: (prefix => generateRoute([
            '/overview', // 团队概况
            '/management', // 团队管理
            '/reports', // 团队报表
            '/popularize' // 推广管理
          ], ['agentCenter/team/', prefix], __import)
          )('agent_')
        },
        { path: 'personalCenter', // 个人中心仅包裹
          component: _import('memberCenter/PersonalCenter'),
          redirect: {name: 'agent_personalData'},
          children: (prefix => [...generateRoute([
            '/personalData', // 个人资料
            '/changePassword', // 修改密码
            'bankcardManage', // 银行卡管理
            'notices' // 消息公告
          ], ['memberCenter/personalCenter/', prefix], _import),
          { path: 'withdrawal', name: `${prefix}withdrawal`, component: _import('memberCenter/financeCenter/withdrawal/Withdrawal') } // 提取佣金
          ]
          )('agent_')
        }
      ]
    }
  ]
}
