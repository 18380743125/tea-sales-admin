import { IQueryType } from './common'

export interface IQueryEvaluateType extends IQueryType {
  uname: string
  goodsName: string
}

export interface IPublishCommentType {
  evaluateId: number
  content: string
  parentId?: number
}
