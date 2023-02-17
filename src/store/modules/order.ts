import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IQueryOrderType } from '../../types/order'
import { DispatchType } from '../index'
import debounce from '../../utils/debounce'
import { queryOrdersReq } from '../../service/modules/order'

interface IState {
  orders: Record<string, any>[]
  count: number
  loading: boolean
}

const initialState: IState = {
  orders: [],
  count: 0,
  loading: false
}

const orderReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    changeOrders(state, { payload }) {
      state.orders = payload
    },
    changeCount(state, { payload }) {
      state.count = payload
    },
    changeLoading(state, { payload }) {
      state.loading = payload
    }
  }
})

const _getOrders = (params: IQueryOrderType, dispatch: DispatchType) => {
  queryOrdersReq(params).then((res) => {
    if (res.message === 'ok') {
      dispatch(changeOrders(res.data[0]))
      dispatch(changeCount(res.data[1]))
    }
    dispatch(changeLoading(false))
  })
}
const _getOrdersDebounce = debounce(_getOrders, 500)

export const queryOrdersAction = createAsyncThunk(
  '/order/load',
  (params: IQueryOrderType, { dispatch }) => {
    dispatch(changeLoading(true))
    _getOrdersDebounce(params, dispatch)
  }
)

export const { changeOrders, changeCount, changeLoading } = orderReducer.actions

export default orderReducer.reducer
