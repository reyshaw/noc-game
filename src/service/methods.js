import request from '@/service/request'

// Get请求
export function get (url, params, header) {
  let getParams = {
    url,
    method: 'get',
    params: params,
    data: true
  }
  if (header) {
    getParams.headers = header
  }
  return request(getParams)
}

// post请求
export function post (url, data, header) {
  let postData = {
    url,
    method: 'post',
    data
  }
  if (header) {
    postData.headers = header
  }
  return request(postData)
}

// put请求
export function put (url, data) {
  return request({
    url,
    method: 'put',
    data
  })
}

// delete请求
export function del (url, params) {
  return request({
    url,
    method: 'delete',
    params
  })
}
