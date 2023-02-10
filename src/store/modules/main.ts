import { createSlice } from '@reduxjs/toolkit'
import { AlertColor } from '@mui/material'

interface AlertConfig {
  type: AlertColor
  message: string
  open: boolean
  anchorOrigin: object
  autoHideDuration: number
}

interface MainState {
  alertConfig: AlertConfig
}

const initialState: MainState = {
  alertConfig: {
    open: false,
    anchorOrigin: { vertical: 'top', horizontal: 'center' },
    autoHideDuration: 3000,
    message: '',
    type: 'success'
  }
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    changeOpen(state, { payload }) {
      if (payload.open === undefined) payload.open = true
      state.alertConfig = { ...state.alertConfig, ...payload }
    }
  }
})

export const { changeOpen } = mainSlice.actions

export default mainSlice.reducer
