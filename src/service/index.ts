import { localCache } from '@/utils/cache'
import { BASE_URL } from './config/index'
import BRequest from './request'
import { TIME_OUT } from './config'

const bRequest = new BRequest({
  timeout: TIME_OUT,
  baseURL: BASE_URL,
  interceptors: {
    requestSuccessFn(config) {
      if (config.headers) {
        config.headers['Authorization'] = 'Bearer ' + localCache.getCache('token') ?? ''
      }
      return config
    }
  }
})

export default bRequest
