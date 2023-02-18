import { IQueryEvaluateType } from '@/types/evaluate'
import bRequest from '..'

export function queryEvaluateReq(params: IQueryEvaluateType) {
  return bRequest.get({
    url: '/api/v1/evaluate',
    params
  })
}

export function removeEvaluateReq(id: number) {
  return bRequest.delete({
    url: `/api/v1/evaluate/${id}`
  })
}
