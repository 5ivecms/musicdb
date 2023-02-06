/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import QueryString from 'qs'

import { axiosPublic } from '../api/api.instances'
import { genresAPIUrl } from '../config/api.config'
import type { CreateManyGenresDto, GenreModel } from '../models'

export const GenreService = {
  create: async (data: any) => {
    return axiosPublic.post(``, data)
  },

  createMany: async (data: CreateManyGenresDto) => {
    return axiosPublic.post<any>(genresAPIUrl.createMany(), data)
  },

  delete: async (id: number | string) => {
    return axiosPublic.delete<any>(`/genres/${id}`)
  },

  deleteMany: async (ids: string) => {
    return axiosPublic.delete<any>(genresAPIUrl.deleteMany(), { params: { ids } })
  },

  findAll: async (params: any = {}) =>
    axiosPublic.get(genresAPIUrl.findAll(), {
      params,
      paramsSerializer: (params) => QueryString.stringify(params),
    }),

  findOne: async (id: number | string) => {
    return axiosPublic.get<GenreModel>(genresAPIUrl.findOne(id))
  },

  update: async (genreId: number, data: any) => {
    return axiosPublic.put<any>('')
  },
}
