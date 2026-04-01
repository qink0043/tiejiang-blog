import Message from '@/components/Message'
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'

export interface ResponseData {
  code: number
  data?: any
  message: string
}

// console.log('import.meta.env: ', import.meta.env);

// 创建 axios 实例
let service: AxiosInstance | any
service = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // api 的 base_url
  timeout: 50000, // 请求超时时间
})

// request 拦截器 axios 的一些配置
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  (error: any) => {
    // Do something with request error
    console.error('error:', error) // for debug
    Promise.reject(error)
  },
)

// respone 拦截器 axios 的一些配置
service.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.status === 200) {
      const data: ResponseData = res.data
      if (data.code === 200) {
        return data.data
      } else {
        console.log('data.:', data)

        Message.error(data.message)
      }
    } else {
      Message.error('网络错误!')
      return Promise.reject(new Error(res.data.message || 'Error'))
    }
  },
  (error: any) => Promise.reject(error),
)

export default service
