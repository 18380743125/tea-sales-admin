import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '..'
import { queryEvaluateReq } from '@/service/modules/evaluate'
import debounce from '@/utils/debounce'
import { IQueryEvaluateType } from '@/types/evaluate'

interface IState {
  evaluates: Record<string, any>[]
  count: number
  loading: boolean
}

const initialState: IState = {
  evaluates: [],
  count: 0,
  loading: false
}

const _getOrders = (params: IQueryEvaluateType, dispatch: DispatchType) => {
  queryEvaluateReq(params).then((res) => {
    if (res.message === 'ok') {
      dispatch(changeEvaluates(res.data[0]))
      dispatch(changeCount(res.data[1]))
    }
    dispatch(changeLoading(false))
  })
}
const _getEvaluatesDebounce = debounce(_getOrders, 500)

export const queryEvaluateAction = createAsyncThunk(
  '/order/load',
  (params: IQueryEvaluateType, { dispatch }) => {
    dispatch(changeLoading(true))
    _getEvaluatesDebounce(params, dispatch)
  }
)

const evaluateReducer = createSlice({
  name: 'evaluate',
  initialState,
  reducers: {
    changeEvaluates(state, { payload }) {
      state.evaluates = payload
    },
    changeCount(state, { payload }) {
      state.count = payload
    },
    changeLoading(state, { payload }) {
      state.loading = payload
    }
  }
})

export const { changeEvaluates, changeCount, changeLoading } = evaluateReducer.actions
export default evaluateReducer.reducer
