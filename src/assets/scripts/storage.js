// 获取sessionStorage的值，字符串直接返回，其他用JSON解码
export function getSessionStorage (item) {
  let result = sessionStorage.getItem(item)
  try {
    result = JSON.parse(result)
  } catch (e) {}
  return result
}

// 设置sessionStorage的值,字符串直接存，其他用JSON编码
export function setSessionStorage (item, value) {
  sessionStorage.setItem(item, typeof value === 'string' ? value : JSON.stringify(value))
}

// 删除sessionStorage,传值删除单个，不传全部删除
export function removeSessionStorage (item) {
  if (item) {
    sessionStorage.removeItem(item)
  } else {
    sessionStorage.clear()
  }
}

// 获取localStorage
export function getLocalStorage (item) {
  let result = localStorage.getItem(item)
  try {
    result = JSON.parse(result)
  } catch (e) {}
  return result
}

// 设置localStorage
export function setLocalStorage (item, value) {
  localStorage.setItem(item, typeof value === 'string' ? value : JSON.stringify(value))
}
// 删除localStorage
export function removeLocalStorage (item) {
  if (item) {
    localStorage.removeItem(item)
  } else {
    localStorage.clear()
  }
}
