import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { ILoginFormType } from '@/types/user'
import { loginReq } from '../../service/modules/login'
import { localCache } from '@/utils/cache'
import { changeOpen } from './main'
import { ConstEnum } from '../../enum/constant.enum'
import { ErrorEnum } from '../../enum/error.enum'

interface IState {
  user: Record<string, any>
  roles: Array<Record<string, unknown>>
}

interface IArgType {
  values: ILoginFormType
  switchCaptcha: Function
  navigate: Function
}

const initialState: IState = {
  user: localCache.getCache('user') ?? {},
  roles: localCache.getCache('roles') ?? false
}

// 统一处理登录错误信息
function handleLoginError(res: any, dispatch: Function, switchCaptcha: Function) {
  let message = '服务器错误~'
  switch (res.message) {
    case ErrorEnum.CAPTCHA_ERROR:
      message = '验证码错误~'
      break
    case ErrorEnum.CAPTCHA_EXPIRES:
      message = '验证码已过期~'
      break
    case ErrorEnum.LOGIN_ERROR:
      message = '用户名或密码错误~'
      break
    case ErrorEnum.NO_ADMIN_AUTH:
      message = '无管理员权限~'
      break
  }
  if (res.message !== 'ok') {
    dispatch(changeOpen({ message, type: 'error' }))
    switchCaptcha()
    return false
  } else return true
}

// 登录 action
export const loginAction = createAsyncThunk('login/login', (args: IArgType, { dispatch }) => {
  const { values, switchCaptcha, navigate } = args
  loginReq(values).then((res) => {
    if (!handleLoginError(res, dispatch, switchCaptcha)) return
    const data = res.data
    const roles = data?.user?.roles || ''
    delete data.user.roles
    changeRoles(roles)
    changeRoles(data.user)
    localCache.setCache(ConstEnum.ACCESS_TOKEN, data.accessToken)
    localCache.setCache(ConstEnum.REFRESH_TOKEN, data.refreshToken)
    localCache.setCache(ConstEnum.USER, data.user)
    localCache.setCache(ConstEnum.ROLES, roles)
    dispatch(changeOpen({ message: '登录成功~', type: 'success' }))
    navigate('/')
  })
})

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeUser(state, { payload }) {
      const newUser = { ...state.user, ...payload }
      state.user = newUser
      localCache.setCache(ConstEnum.USER, newUser)
    },
    changeRoles(state, { payload }) {
      state.roles = payload
    }
  }
})

export const { changeUser, changeRoles } = loginSlice.actions
export default loginSlice.reducer
