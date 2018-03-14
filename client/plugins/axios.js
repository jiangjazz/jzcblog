/**
 * axios配置
 */
import Vue from 'vue'
import * as axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = process.env.baseUrl
// axios.defaults.headers.common['Authorization'] = 'testCookie'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true
// axios.defaults.timeout = 5000

axios.interceptors.request.use(config => {
  console.log('%c触发了axios请求,具体配置如下：', 'background: lightgreen;')
  const lastURL = config.url
  if (config.url.indexOf('/exapi') !== -1) {
    console.log('这是本地api')
    config.baseURL = ''
    config.url = config.url.replace(config.baseURL, '')
  } else {
    console.log('这是线上api')
    config.url = lastURL
    // 在发送请求之前做某件事
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
  }
  console.log(config)
  return config
})

axios.interceptors.response.use(response => {
  // if (response.data.status_code !== '200') {
  //     if (response.data.hasOwnProperty('error')) {
  //         for (let item in response.data.error) {
  //             response.data.message += ' ' + response.data.error[item][0] + ' '
  //         }
  //         return response
  //     } else {
  //         return response
  //     }
  // } else {
  //     return response
  // }
  return response.data
}, error => {
  return Promise.reject(error)
})

// 挂载全局
Vue.prototype.$http = axios
