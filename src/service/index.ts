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
      if (accessToken) config.headers.authorization = accessToken
      if (refreshToken) config.headers.refreshtoken = refreshToken
      return config
    },
    responseSuccessFn(res: any) {
      // 通用错误处理
      const msg = res.message
      switch (msg) {
        case ErrorEnum.SERVER:
          message.error('服务器异常！')
          break
        case ErrorEnum.PARAMS:
          message.error('参数错误！')
          break
        case ErrorEnum.UNAUTHORIZED:
          localCache.clear()
          message.error('请先登录！', 3, () => (window.location.href = '/login'))
          break
        case ErrorEnum.NO_ADMIN_AUTH:
          localCache.clear()
          message.error('无管理员权限！', 3, () => (window.location.href = '/login'))
          break
        case ErrorEnum.PASSWORD_ERROR:
          message.error('密码错误！')
          break
        case ErrorEnum.FORBIDDEN:
          message.error('禁止访问！')
          break
        case ErrorEnum.NO_EXISTS:
          message.error('操作不存在！')
          break
        case ErrorEnum.LOGIN_EXPIRES:
          localCache.clear()
          message.error('登录过期！', 3, () => (window.location.href = '/login'))
      }
      return res
    }
  }
})

export default bRequest
