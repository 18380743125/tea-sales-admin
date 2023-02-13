import bRequest from '..'
import { IQueryGoodsType } from '@/types/goods'
// 查询商品
export function getGoodsReq(params: IQueryGoodsType) {
  return bRequest.get({
    url: '/api/v1/goods',
    params
  })
}

// 根据 id 查询商品
export function getGoodsByIdReq(id: number) {
  return bRequest.get({
    url: `/api/v1/goods/${id}`
  })
}

// 根据 id 删除商品
export function removeGoods(id: number) {
  return bRequest.delete({
    url: `/api/v1/goods/${id}`
  })
}

// 查询类别
export function getCategoriesReq() {
  return bRequest.get({
    url: '/api/v1/category'
  })
}

// 删除类别
export function removeCategoryReq(id: number) {
  return bRequest.delete({
    url: `/api/v1/category/${id}`
  })
}

// 添加类别
export function addCategoryReq(name: string) {
  return bRequest.post({
    url: '/api/v1/category',
    data: { name }
  })
}

// 商品上下架
export function upAndDownReq(id: number, state: string) {
  return bRequest.patch({
    url: `/api/v1/goods/${id}`,
    data: {
      state
    }
  })
}
