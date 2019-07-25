import axios from 'axios'
import qs from 'qs'
import md5Hex from 'md5-hex'
import { toByteStringUTF8 } from './utf8'

// 接口密钥，需要与后台一致
const CIPHER = process.env.CIPHER

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 默认为application/json
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// request interceptor
service.interceptors.request.use(
  config => {
    // 签名认证
    if (!config.params) {
      config.params = {}
    }

    const sign = getSign(config)
    config.params['sign'] = sign

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

function getLinkedString(config) {
  const arr = []
  let dataObj = {}
  for (const key in config.params) {
    arr.push(key)
  }
  if (isString(config.data)) {
    dataObj = qs.parse(config.data)
    for (const key in dataObj) {
      arr.push(key)
    }
  } else if (config.data instanceof FormData) {
    for (const key of config.data.keys()) {
      if (!(config.data.get(key) instanceof Object)) { arr.push(key) }
    }
  } else {
    for (const key in config.data) {
      if (!(config.data[key] instanceof Object)) { arr.push(key) }
    }
  }
  arr.sort()
  let str = ''
  for (const i in arr) {
    if (config.params[arr[i]] !== undefined) { // 允许空字符串
      str += arr[i] + '=' + config.params[arr[i]] + '&'
    } else {
      if (config.data instanceof FormData) {
        str += arr[i] + '=' + config.data.get(arr[i]) + '&'
      } else if (isString(config.data)) {
        str += arr[i] + '=' + dataObj[arr[i]] + '&'
      } else {
        str += arr[i] + '=' + config.data[arr[i]] + '&'
      }
    }
  }
  return str.substr(0, str.length - 1)
}

function isString(str) {
  return (typeof str === 'string') && str.constructor === String
}

function getSign(config) {
  const linkedString = getLinkedString(config)
  const sign = md5Hex(toByteStringUTF8(linkedString + CIPHER))
  return sign
}

export default service
