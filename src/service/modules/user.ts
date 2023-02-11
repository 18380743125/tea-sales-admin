import bRequest from '../index'
import type { IPasswordType, IQueryUserType, IUpdateUserType } from '@/types/user'

// 修改密码
export function updatePwdReq(params: IPasswordType) {
  return bRequest.post({
    url: '/api/v1/user/update_pwd',
    data: params
  })
}

// 根据条件查询用户信息
export function getUsersReq(params: IQueryUserType) {
  return bRequest.get({
    url: '/api/v1/user',
    params
  })
}

export function updateUserReq(id: number, params: IUpdateUserType) {
  return bRequest.patch({
    url: `/api/v1/user/${id}`,
    data: params
  })
}
