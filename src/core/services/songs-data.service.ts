/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import QueryString from 'qs'

import { axiosPublic } from '../api/api.instances'
import { songsDataAPIUrl } from '../config/api.config'

export const SongsDataService = {
  delete: async (id: number) => axiosPublic.delete<any>(songsDataAPIUrl.delete(id)),

  deleteAll: async () => axiosPublic.delete<any>(songsDataAPIUrl.deleteAll()),

  deleteMany: async (ids: string) =>
    axiosPublic.delete<any>(songsDataAPIUrl.deleteMany(), {
      params: { ids },
    }),

  findAll: async (params: any = {}) =>
    axiosPublic.get(songsDataAPIUrl.findAll(), {
      params,
      paramsSerializer: (params) => QueryString.stringify(params),
    }),
}
