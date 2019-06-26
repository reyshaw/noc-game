const pickerMix = {
  data () {
    return {
      dateValue: '', // 选择的日期
      pickerOptions: { // 日期区间快捷选择器
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            const end = new Date()
            const start = new Date(new Date().setHours(0, 0, 0, 0)) // 今天的0时0分0秒
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const timeStamp = new Date(new Date().setHours(0, 0, 0, 0))
            const start = timeStamp - 3600 * 24 * 1000
            const end = timeStamp - 1
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '前天',
          onClick (picker) {
            const timeStamp = new Date(new Date().setHours(0, 0, 0, 0))
            const start = timeStamp - 3600 * 24 * 1000 * 2 // - 两天
            const end = timeStamp - 3600 * 24 * 1000 - 1
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '本周',
          onClick (picker) {
            const end = new Date()
            const DAY = end.getDay()
            const timeStamp = new Date(new Date().setHours(0, 0, 0, 0))
            const start = timeStamp - 3600 * 24 * 1000 * (DAY - 1)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '上周',
          onClick (picker) {
            const timeStamp = new Date(new Date().setHours(0, 0, 0, 0))
            const start = timeStamp - 3600 * 24 * 1000 * ((new Date()).getDay() - 1 + 7)
            const end = timeStamp - 3600 * 24 * 1000 * ((new Date()).getDay() - 1) - 1
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '本月',
          onClick (picker) {
            const end = new Date()
            const DATE = end.getDate()
            const timeStamp = new Date(new Date().setHours(0, 0, 0, 0))
            const start = timeStamp - 3600 * 24 * 1000 * (DATE - 1)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近7天',
          onClick (picker) {
            const timeStamp = new Date(new Date().setHours(0, 0, 0, 0))
            const start = timeStamp - 3600 * 24 * 1000 * (7 - 1)
            const end = new Date()
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近30天',
          onClick (picker) {
            const timeStamp = new Date(new Date().setHours(0, 0, 0, 0))
            const start = timeStamp - 3600 * 24 * 1000 * (30 - 1)
            const end = new Date()
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  }
}

export default pickerMix
