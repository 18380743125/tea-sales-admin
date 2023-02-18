import bRequest from '../index'
import type { IQueryOrderType, IDeliverGoodsType } from '@/types/order'

// 查询订单信息 用户名、手机号、商品名称、订单状态
export function queryOrdersReq(params: IQueryOrderType) {
  return bRequest.get({
    url: '/api/v1/order',
    params
  })
}

// 订单发货
export function deliverOrderReq(params: IDeliverGoodsType) {
  return bRequest.post({
    url: '/api/v1/logistics',
    data: params
  })
}
