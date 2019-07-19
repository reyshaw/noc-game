import request from '@/service/request'
const oheaders = {
  'Content-Type': 'application/json;charset=utf-8',
  'Accept': 'application/json;charset=utf-8'
}

/***
 * get请求
 * @param url： 路径
 * @param params： 请求参数
 * @param headers
 */
export function get (url, params, headers = oheaders) {
  return request({
    url,
    method: 'get',
    params: params || {},
    data: true,
    headers
  })
}

/***
 * post请求
 * @param url： 路径
 * @param data: 参数
 * @param headers：post头
 */
export function post (url, data, headers = oheaders) {
  return request({
    url,
    method: 'post',
    data: data || {},
    headers
  })
}

/***
 * put请求,整个更新
 * @param url
 * @param data
 * @param headers
 */
export function put (url, data, headers = oheaders) {
  return request({
    url,
    method: 'put',
    data: data || {},
    headers
  })
}

/***
 * patch请求,局部更新
 * @param url
 * @param data
 * @param headers
 */
export function patch (url, data, headers = oheaders) {
  return request({
    url,
    method: 'patch',
    data: data || {},
    headers
  })
}

/***
 * delete请求
 * @param url
 * @param params
 * @param headers
 */
export function del (url, params, headers = oheaders) {
  return request({
    url,
    method: 'delete',
    params: params || {},
    headers
  })
}

export default {
  get,
  post,
  put,
  patch,
  del
}
