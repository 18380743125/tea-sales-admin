import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface BInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFailFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailFn?: (err: any) => any
}

export interface BRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: BInterceptors<T>
}
