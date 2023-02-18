import { IQueryType } from './common'

export interface IQueryOrderType extends IQueryType {
  goodsName?: string
  state?: string
  uname?: string
  phone?: string
}

export interface IDeliverGoodsType {
  orderId?: number
  userId?: number
  addressId?: number
  way?: string
}
