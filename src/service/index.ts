import { AxiosResponse } from 'axios'
import Request from './request'

import type { RequestConfig, MyResponse } from './request/types'

// 重写返回类型
interface MyRequestConfig<T, R> extends RequestConfig<MyResponse<R>> {
  data?: T
}

const request = new Request({
  baseURL: import.meta.env.BASE_URL,
  timeout: 1000 * 60 * 5,
  withCredentials: true,
  interceptors: {
    // 请求拦截器
    requestInterceptors: config => config,
    // 响应拦截器
    responseInterceptors: (result: AxiosResponse) => result,
  },
})

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {MyRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const req = <D = any, T = any>(config: MyRequestConfig<D, T>) => {
  const { method = 'GET' } = config
  if (method === 'get' || method === 'GET') {
    config.params = config.data
  }
  return request.request<MyResponse<T>>(config)
}
// 取消请求
export const cancelRequest = (url: string | string[]) => request.cancelRequest(url)

// 取消全部请求
export const cancelAllRequest = ():void => request.cancelAllRequest()

export const post = <D = any, T = any>(url: string, data: D, params?: T) => req({
  method: 'post',
  url,
  data,
  params,
})

export const get = <D = any, T = any>(url: string, data: D, params?: T) => req({
  method: 'get',
  url,
  params,
})

export const put = <D = any, T = any>(url: string, data: D, params?: T) => req({
  method: 'put',
  url,
  params,
  data,
})

export const _delete = <D = any>(url: string, params?: D) => req({
  method: 'delete',
  url,
  params,
})

export default req
