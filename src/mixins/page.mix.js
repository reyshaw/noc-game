import {formatDate} from '@/assets/scripts/utils'
const pageMix = {
  data () {
    return {
      dialogVisible: false, // 对话框
      tableData: [], // 列表数据
      loading: false, // 是否请求中
      total: 0, // 总共条数
      selectionKey: 'id', // 过滤条件
      multipleSelection: [], // 多选
      timeZone: [new Date(new Date().setHours(0, 0, 0, 0) - 3600 * 24 * 1000 * (7 - 1)), new Date()], // 默认7天
      listURL: '', // 获取列表的链接
      payload: { // post数据
        pageDomain: {
          pageNum: 1,
          pageSize: 50
        }
      },
      extraData: { // 需要被重写
      }
    }
  },
  methods: {
    fetchList (callback, methods) { // 获取数据,可以重写
      // console.log(`pageMix: fetchList`)
      if (this.timeZone) { // 有时间区间的
        this.payload.beginTime = formatDate(new Date(this.timeZone[0]))
        this.payload.endTime = formatDate(new Date(this.timeZone[1]))
      }
      this.loading = true
      if (methods) {
        this.get(this.listURL, Object.assign({}, this.payload, this.extraData)).then(res => {
          this.loading = false
          this.tableData = res.data.list
          this.total = res.data.total
          callback && callback(res.data)
        }, err => {
          this.loading = false
          console.log(err)
        })
      } else {
        this.post(this.listURL, Object.assign({}, this.payload, this.extraData)).then(res => {
          this.loading = false
          this.tableData = res.data.list
          this.total = res.data.total
          callback && callback(res.data)
        }, err => {
          this.loading = false
          console.log(err)
        })
      }
    },
    deleteUnnecessaryParams (payLoad) { // 删除不必传的数据
      let _payLoad = JSON.parse(JSON.stringify(payLoad))
      for (let key in _payLoad) {
        if (_payLoad[key] === '' || payLoad[key] < 0) {
          delete _payLoad[key]
        }
      }
      return _payLoad
    },
    onPageNumChange (num) { // 页数变化
      this.payload.pageDomain.pageNum = num
      this.fetchList()
    },
    onPageSizeChange (size) { // 每页长度变化
      this.payload.pageDomain.pageSize = size
      this.fetchList()
    },
    onSelectionChange (selections) { // 多选
      this.multipleSelection = []
      selections.map(item => {
        this.multipleSelection.push(item[this.selectionKey])
      })
    }
  }
}

export default pageMix
