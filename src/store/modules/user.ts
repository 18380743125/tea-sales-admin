import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IQueryUserType } from '@/types/user'
import { getUsersReq } from '@/service/modules/user'

interface IState {
  users: Record<string, any>[]
  count: number
}

const initialState: IState = {
  users: [],
  count: 0
}

export const loadUsersAction = createAsyncThunk(
  '/user/load',
  (params: IQueryUserType, { dispatch }) => {
    getUsersReq(params).then((res) => {
      if (res.message == 'ok') {
        console.log(res.data[0])
        dispatch(changeUsers(res.data[0]))
        dispatch(changeCount(res.data[1]))
      }
    })
  }
)

const mainSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUsers(state, { payload }) {
      state.users = payload
    },
    changeCount(state, { payload }) {
      state.count = payload
    }
  }
})

export const { changeUsers, changeCount } = mainSlice.actions

export default mainSlice.reducer
