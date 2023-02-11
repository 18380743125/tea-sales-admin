import type { IQueryType } from './common'

export interface ILoginFormType {
  name: string
  password: string
  captcha: string
  remember: boolean
  flag?: number
}

export interface IPasswordType {
  oldpassword: string
  password: string
  againpassword: string
}

export interface IQueryUserType extends IQueryType {
  name?: string
  phone?: string
  [number]: string
}

export interface IUpdateUserType {
  gender?: string

  age?: number

  phone?: string

  banned?: string
}
