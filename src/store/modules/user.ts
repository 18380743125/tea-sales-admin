import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IQueryUserType } from '@/types/user'
import { getUsersReq } from '@/service/modules/user'
import debounce from '@/utils/debounce'
import { DispatchType } from '..'

interface IState {
  users: Record<string, any>[]
  count: number
}

const initialState: IState = {
  users: [],
  count: 0
}

const getUsers = (params: IQueryUserType, dispatch: DispatchType) => {
  getUsersReq(params).then((res) => {
    if (res.message == 'ok') {
      dispatch(changeUsers(res.data[0]))
      dispatch(changeCount(res.data[1]))
    }
  })
}
const _debounce = debounce(getUsers, 500, true)

export const loadUsersAction = createAsyncThunk(
  '/user/load',
  (params: IQueryUserType, { dispatch }) => {
    _debounce(params, dispatch)
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
