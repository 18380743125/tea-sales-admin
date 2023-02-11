import { configureStore } from '@reduxjs/toolkit'
import { shallowEqual, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import mainReducer from './modules/main'
import loginReducer from './modules/login'
import userReducer from './modules/user'

const store = configureStore({
  reducer: {
    main: mainReducer,
    login: loginReducer,
    user: userReducer
  }
})

type GetStateFnType = typeof store.getState

type IRootState = ReturnType<GetStateFnType>

type DispatchType = typeof store.dispatch

export type { IRootState }
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
export const useAppDispatch: () => DispatchType = useDispatch
export const shallowEqualApp = shallowEqual

export default store
