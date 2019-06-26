// 日期格式化
const formatDate = function (date) {
  if (date) {
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    let h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    let minute = date.getMinutes()
    minute = minute < 10 ? ('0' + minute) : minute
    let second = date.getSeconds()
    second = second < 10 ? ('0' + second) : second
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
  } else {
    return ''
  }
}

// 生成唯一uuid
function getUUID () {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')
  return uuid
}

function sort (srcArr, ruleArr) { // 按照给定的rule数组顺序排序
  if (ruleArr && ruleArr instanceof Array) {
    return srcArr.sort(function (prev, next) {
      let prevIndex = ruleArr.findIndex(function (ele) { return prev.categoryCode.toLowerCase() === ele }) // 前一个元素的index
      let nextIndex = ruleArr.findIndex(function (ele) { return next.categoryCode.toLowerCase() === ele }) // 后一个元素的index
      return prevIndex - nextIndex
    })
  }
}

function getAllIds (arr, key, result = []) { // 递归查找所有的id
  arr.map(item => {
    if (item.id) {
      result.push(item.id)
    }
    if (item[key]) {
      getAllIds(item[key], key, result)
    }
  })
  return result
}

const arrayToObject = function (array, obj = {}) { // 数组转成对象，key和value相同
  if (!array.length) {
    throw new Error('数组长度不能为空!')
  }
  if (!(array instanceof Array)) {
    throw new Error('参数必须是一个数组!')
  }
  array.map(item => {
    obj[item + ''] = item
  })
  return obj
}

const isObject = function (obj) { // 判断一个对象是不是对象
  if (obj === null || !obj) {
    throw new Error('isObject: 参数必传且不能为null')
  }
  return typeof obj === 'object'
}

const isEmptyObject = function (obj) { // 判断一个对象是不是空对象
  if (obj === null || !obj) {
    throw new Error('isEmptyObject: 参数必传且不能为null')
  }
  if (!isObject(obj)) {
    throw new Error('isEmptyObject: 参数必须是object对象')
  }
  return !Object.keys(obj).length
}

const upperCaseFirst = function (str) {
  if (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}

const generateRoute = function (arr, prefix, fn, result = []) { // ['home/index', 'promotion'] 原数组, 前缀, 导入函数, 返回结果
  if (arr && arr.length) {
    arr.forEach(item => {
      const _item = item.split('/') // 对传进来的字符串分割
      const _last = _item[_item.length - 1] // 获取最后一个元素
      let _comp = `${_last}/`
      if (_item.length > 1) { // 复合型参数 home/index   /test
        if (!_item[0]) { // 以/打头的
          _comp = ''
        } else { // home/index这种形式的
          _comp = `${_item.slice(0, _item.length - 1).join('/')}/`
        }
      }
      if (prefix.length > 0) { // 有前缀的 member/memberCenter/ .....
        _comp = `${prefix[0]}${_comp}`
      }
      const route = {
        path: _last,
        name: prefix.length > 1 ? prefix[1] + _last : _last,
        component: fn(_comp + `${upperCaseFirst(_last)}`)
      }
      result.push(route)
    })
    return result
  }
}

export {
  formatDate,
  getUUID,
  sort,
  getAllIds,
  arrayToObject,
  isObject,
  isEmptyObject,
  generateRoute
}
