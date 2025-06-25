import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例
const http = axios.create({
  baseURL: '/api', // 修改为相对路径，由Vite代理转发
  timeout: 30000 // 增加超时时间到30秒
})

// 请求拦截器
http.interceptors.request.use(
  config => {
    // 在请求头中添加请求凭证
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
    }
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // 处理错误响应
    let message = '请求失败'
    
    if (error.response) {
      // 服务器返回了错误状态码
      const { status, data } = error.response
      
      switch (status) {
        case 400:
          message = data.detail || '请求参数错误'
          break
        case 404:
          message = data.detail || '请求的资源不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        default:
          message = `请求失败(${status})`
      }
    } else if (error.request) {
      // 请求发出但没有收到响应
      message = '服务器无响应，请检查API服务是否运行'
      console.error('无响应错误:', error.request)
    } else {
      // 请求配置出错
      message = '请求配置错误'
    }
    
    ElMessage.error(message)
    console.error('响应错误:', error)
    return Promise.reject(error)
  }
)

export default http 