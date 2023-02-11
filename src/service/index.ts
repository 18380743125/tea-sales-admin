import { localCache } from '@/utils/cache'
import { BASE_URL } from './config/index'
import BRequest from './request'
import { TIME_OUT } from './config'
import { ConstEnum } from '../enum/constant.enum'
import { message } from 'antd'
import { ErrorEnum } from '../enum/error.enum'

const bRequest = new BRequest({
  timeout: TIME_OUT,
  baseURL: BASE_URL,
  withCredentials: true,
  interceptors: {
    requestSuccessFn(config: any) {
      const accessToken = localCache.getCache(ConstEnum.ACCESS_TOKEN)
      const refreshToken = localCache.getCache(ConstEnum.REFRESH_TOKEN)
      if (accessToken) config.headers.authorization = 'Bearer ' + accessToken
      if (refreshToken) config.headers.refreshToken = refreshToken
      return config
    },
    responseSuccessFn(res: any) {
      const msg = res.message
      switch (msg) {
        case ErrorEnum.SERVER:
          message.error('服务器异常！')
          break
        case ErrorEnum.PARAMS:
          message.error('参数错误！')
          break
        case ErrorEnum.UNAUTHORIZED:
          message.error('请先登录！', 3, () => (window.location.href = '/login'))
          break
        case ErrorEnum.NO_ADMIN_AUTH:
          message.error('无管理员权限！', 3, () => (window.location.href = '/login'))
          break
        case ErrorEnum.PASSWORD_ERROR:
          message.error('密码错误！')
          break
        case ErrorEnum.FORBIDDEN:
          message.error('禁止访问！')
      }
      return res
    }
  }
})

export default bRequest
