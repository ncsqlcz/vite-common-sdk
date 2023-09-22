import { get } from '@/service'
import { useRequest } from '@/hooks'
import type { IGetParams, IGetRes } from './types'

export const getAddrs = (data: IGetParams) => get<IGetParams, IGetRes>('/api/common/postcode/getAddrs', data)
export const useGetAddrs = (data: IGetParams) => useRequest<IGetParams>(getAddrs, data)
