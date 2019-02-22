import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
var baseApis=window.g.search;
// 创建axios实例
const service = axios.create({
  baseURL: baseApis, // api的base_url
  timeout: 1800000    // 请求超时时间
})
service.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error)// for debug
    Message({
      message: '请求超时，请刷新页面!',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
