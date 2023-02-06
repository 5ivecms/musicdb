/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import QueryString from 'qs'

import { axiosPublic } from '../api/api.instances'
import { ZvukSitemapsAPIUrl } from '../config/api.config'
import type { SitemapsInfo } from '../types'

export const ZvukSitemapsService = {
  delete: async (id: number | string) => {
    return axiosPublic.delete<any>(ZvukSitemapsAPIUrl.delete(id))
  },

  deleteAll: async () => {
    return axiosPublic.delete<any>(ZvukSitemapsAPIUrl.deleteAll())
  },

  findAll: async (params: any = {}) => {
    return axiosPublic.get(ZvukSitemapsAPIUrl.findAll(), {
      params,
      paramsSerializer: (params) => QueryString.stringify(params),
    })
  },

  info: async () => {
    return axiosPublic.get<SitemapsInfo>(ZvukSitemapsAPIUrl.info())
  },
}
