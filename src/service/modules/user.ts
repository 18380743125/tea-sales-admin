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

// 更改密码
export function updateUserReq(id: number, params: IUpdateUserType) {
  return bRequest.patch({
    url: `/api/v1/user/${id}`,
    data: params
  })
}

// 禁用 / 解封
export function bannedUserReq(id: number, banned: string) {
  banned = banned === '0' ? '1' : '0'
  return bRequest.post({
    url: '/api/v1/user/banned',
    params: { id, banned }
  })
}
