import { createSlice } from '@reduxjs/toolkit'
import { AlertColor } from '@mui/material'
import { localCache } from '@/utils/cache'
import { ConstEnum } from '@/enum/constant.enum'

// 消息条
interface IAlertConfig {
  type: AlertColor
  message: string
  open: boolean
  anchorOrigin: object
  autoHideDuration: number
}

interface IState {
  alertConfig: IAlertConfig
  currentUrl: string
}

const initialState: IState = {
  alertConfig: {
    open: false,
    anchorOrigin: { vertical: 'top', horizontal: 'center' },
    autoHideDuration: 3000,
    message: '',
    type: 'success'
  },
  currentUrl: localCache.getCache(ConstEnum.CURRENT_URL) ?? ''
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    changeOpen(state, { payload }) {
      if (payload.open === undefined) payload.open = true
      state.alertConfig = { ...state.alertConfig, ...payload }
    },
    changeCurrentUrl(state, { payload }) {
      state.currentUrl = payload
      localCache.setCache(ConstEnum.CURRENT_URL, payload)
    }
  }
})

export const { changeOpen, changeCurrentUrl } = mainSlice.actions

export default mainSlice.reducer
