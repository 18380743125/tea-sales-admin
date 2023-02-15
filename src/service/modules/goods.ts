import bRequest from '..'
import { ICreateGoodsType, IQueryGoodsType, IDiscountType } from '@/types/goods'

// 添加商品
export function addGoodsReq(params: ICreateGoodsType) {
  const fd = new FormData()
  for (const key in params) {
    if (key === 'imgs') {
      params?.imgs?.forEach((item) => {
        fd.append('imgs', item)
      })
      continue
    }
    fd.append(key, params[key])
  }
  return bRequest.post({
    url: '/api/v1/goods',
    data: fd
  })
}

// 修改商品信息
export function updateGoodsReq(id: number, params: ICreateGoodsType) {
  const fd = new FormData()
  for (const key in params) {
    if (params.imgs && key === 'imgs') {
      params.imgs.forEach((item) => {
        fd.append('imgs', item)
      })

      continue
    }
    fd.append(key, params[key])
  }
  return bRequest.patch({
    url: `api/v1/goods/${id}`,
    data: fd
  })
}

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

// 商品上下架
export function upAndDownReq(id: number, state: string) {
  return bRequest.patch({
    url: `/api/v1/goods/${id}`,
    data: {
      state
    }
  })
}

// 根据 id 删除商品
export function removeGoods(id: number) {
  return bRequest.delete({
    url: `/api/v1/goods/${id}`
  })
}

// 查询商品图片
export function queryGoodsImg(id: number) {
  return bRequest.get({
    url: `/api/v1/goods/img/${id}`
  })
}

// 删除商品图片
export function removeGoodsImgReq(name: string) {
  return bRequest.delete({
    url: `/api/v1/goods/remove_img/${name}`
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

// 折扣请求相关
// 新增折扣
export function addDiscount(dto: IDiscountType) {
  return bRequest.post({
    url: '/api/v1/discounts',
    data: dto
  })
}

// 根据商品 ID 查询折扣信息
export function getDiscountByGoodsId(id: number) {
  return bRequest.get({
    url: `/api/v1/discounts/goods/${id}`
  })
}

// 修改折扣信息
export function updateDiscount(id: number, dto: IDiscountType) {
  return bRequest.patch({
    url: `/api/v1/discounts/${id}`,
    data: dto
  })
}
