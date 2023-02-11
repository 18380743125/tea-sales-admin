import bRequest from '..'
import type { ILoginFormType } from '@/types/user'

// 登录模块

// 用户记住密码
export function rememberReq() {
  return bRequest.post({
    url: '/api/v1/auth/remember'
  })
}

// 登录
export function loginReq(form: ILoginFormType) {
  form.flag = 100
  return bRequest.post({
    url: '/api/v1/auth/login',
    data: form
  })
}

// 注销登录
export function logoutReq() {
  return bRequest.post({
    url: '/api/v1/auth/logout'
  })
}
