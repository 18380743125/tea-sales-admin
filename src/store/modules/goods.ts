import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '..'
import { getGoodsReq } from '@/service/modules/goods'
import debounce from '@/utils/debounce'
import type { IQueryGoodsType } from '@/types/goods'
import { getCategoriesReq } from '../../service/modules/goods'

interface IState {
  goods: Record<string, any>[]
  categories: Record<string, any>[]
  count: number
  loading: boolean
}

// 查询商品请求
const getGoods = (params: IQueryGoodsType, dispatch: DispatchType) => {
  getGoodsReq(params).then((res) => {
    if (res.message === 'ok') {
      dispatch(changeGoods(res.data[0]))
      dispatch(changeCount(res.data[1]))
    }
    dispatch(changeLoading(false))
  })
}
const getGoodsDebounce = debounce(getGoods, 300)

// 查询商品 action
export const queryGoodsAction = createAsyncThunk(
  '/goods/load',
  async (params: IQueryGoodsType, { dispatch }) => {
    dispatch(changeLoading(true))
    getGoodsDebounce(params, dispatch)
  }
)

// 查询类别 action
export const queryCategoriesAction = createAsyncThunk('/goods/load/category', (_, { dispatch }) => {
  getCategoriesReq().then((res) => {
    if (res.message === 'ok') dispatch(changeCategories(res.data))
  })
})

const initialState: IState = {
  goods: [],
  count: 0,
  loading: false,
  categories: []
}

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    changeGoods(state, { payload }) {
      state.goods = payload
    },
    changeCount(state, { payload }) {
      state.count = payload
    },
    changeLoading(state, { payload }) {
      state.loading = payload
    },
    changeCategories(state, { payload }) {
      state.categories = payload
    }
  }
})

export const { changeGoods, changeCount, changeLoading, changeCategories } = goodsSlice.actions

export default goodsSlice.reducer
