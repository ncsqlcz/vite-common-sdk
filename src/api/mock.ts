import request from '../../../@/service'
import type { IPermissionList,
  IRoleList,
  IUserDetail,
  IUserList } from './types/mock'

export const getUserList = () => request<any, IUserList[]>({
  url: '/mock/getUserList',
  method: 'get',
})
export const getRoleList = () => request<any, IRoleList[]>({
  url: '/mock/getRoleList',
  method: 'get',
})
export const getPermissionList = () => request<any, IPermissionList[]>({
  url: '/mock/getPermissionList',
  method: 'get',
})
export const getUserDetail = (data: { id: any }) => request<any, IUserDetail>({
  url: '/mock/getUserDetail',
  method: 'get',
  data,
})
