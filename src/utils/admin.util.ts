import { localCache } from '@/utils/cache'
export function isAdmin(roles = localCache.getCache('roles')) {
  if (!roles) return false
  const admin = roles.find((item: any) => item.name === '管理员')
  if (!admin || admin.length === 0) return false
  return true
}
