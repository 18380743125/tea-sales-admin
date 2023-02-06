import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { BRequestConfig } from './type'

class BRequest {
  instance: AxiosInstance
  constructor(config: BRequestConfig) {
    this.instance = axios.create(config)
    // 全局请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        Promise.reject(err)
      }
    )
    // 全局响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        Promise.reject(err)
      }
    )

    // 实例拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailFn
    )
  }

  request<T = any>(config: BRequestConfig<T>) {
    // 单次请求成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }
    return new Promise<T>((resolve) => {
      this.instance.request<any, T>(config).then((res) => {
        // 单次响应成功的拦截器
        if (config.interceptors?.responseSuccessFn) {
          res = config.interceptors?.responseSuccessFn(res)
        }
        resolve(res)
      })
    })
  }

  get<T = any>(config: BRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: BRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T = any>(config: BRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: BRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default BRequest
