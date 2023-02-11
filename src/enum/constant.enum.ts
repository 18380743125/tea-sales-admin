export enum ConstEnum {
  CAPTCHA_URL = 'http://localhost:8000/api/v1/auth/captcha?t=', // 验证码路径
  REFRESH_TOKEN = 'refresh_token', // 刷新令牌
  ACCESS_TOKEN = 'access_token', // 访问令牌
  USER = 'user', // 用户
  ROLES = 'roles', // 用户的角色
  CURRENT_URL = 'current_url',
  KEY_PATH = 'key_path' // 左侧导航菜单的 keyPath
}
