import request from '../../../@/service'
import type { IPermissionList,
  IRoleList,
  IUserDetail,
  IUserList } from './types/mock'

export function getUserList() {
  return request<any, IUserList[]>({
    url: '/mock/getUserList',
    method: 'get',
  })
}
export function getRoleList() {
  return request<any, IRoleList[]>({
    url: '/mock/getRoleList',
    method: 'get',
  })
}
export function getPermissionList() {
  return request<any, IPermissionList[]>({
    url: '/mock/getPermissionList',
    method: 'get',
  })
}
export function getUserDetail(data: { id: any }) {
  return request<any, IUserDetail>({
    url: '/mock/getUserDetail',
    method: 'get',
    data,
  })
}
