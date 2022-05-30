import QueryString from 'qs'
import { axiosPublic } from '../api/api.instances'
import { genresAPIUrl } from '../config/api.config'
import { CreateManyGenresDto, GenreModel } from '../models'

export const GenreService = {
  findAll: async (params: any = {}) => {
    return axiosPublic.get(genresAPIUrl.findAll(), {
      params,
      paramsSerializer: (params) => {
        return QueryString.stringify(params)
      },
    })
  },

  findOne: async (id: number | string) => {
    return axiosPublic.get<GenreModel>(genresAPIUrl.findOne(id))
  },

  create: async (data: any) => {
    return axiosPublic.post(``, data)
  },

  createMany: async (data: CreateManyGenresDto) => {
    return axiosPublic.post<any>(genresAPIUrl.createMany(), data)
  },

  delete: async (id: string | number) => {
    return axiosPublic.delete<any>(`/genres/${id}`)
  },

  deleteMany: async (ids: string) => {
    return axiosPublic.delete<any>(genresAPIUrl.deleteMany(), { params: { ids } })
  },

  update: async (genreId: number, data: any) => {
    return axiosPublic.put<any>('')
  },
}
