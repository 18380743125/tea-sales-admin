import { RcFile } from 'antd/es/upload'
import { IQueryType } from './common'
export interface IQueryGoodsType extends IQueryType {
  name?: string
  category?: number
}

export interface ICreateGoodsType {
  name: string
  category: string
  price: string
  stock: string
  weight: string
  description: string
  imgs?: RcFile[]

  [index: string]: any
}

export interface IDiscountType {
  goodsId?: number
  id?: number
  rate?: number
  descripion?: string
}
