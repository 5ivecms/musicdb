/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import QueryString, { stringify } from 'qs'

import { axiosPublic } from '../api/api.instances'
import { releasesAPIUrl } from '../config/api.config'
import type { SearchParams } from '../types'

export const ReleaseService = {
  findAll: async (params: any = {}) => {
    return axiosPublic.get(releasesAPIUrl.findAll(), {
      params,
      paramsSerializer: (params) => QueryString.stringify(params),
    })
  },

  search: (params: SearchParams<Record<string, string>>) => {
    return axiosPublic.get<any>(releasesAPIUrl.search(), {
      params,
      paramsSerializer: () => stringify(params),
    })
  },
}
