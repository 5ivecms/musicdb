import QueryString from 'qs'
import { axiosPublic } from '../api/api.instances'
import { getGenresUrl } from '../config/api.config'
import { GenreModel } from '../models'

export const GenreService = {
  findAll: async (params: any = {}) => {
    return axiosPublic.get(getGenresUrl(), {
      params,
      paramsSerializer: (params) => {
        return QueryString.stringify(params)
      },
    })
  },

  findOne: async (id: number | string) => {
    return axiosPublic.get<GenreModel>('')
  },

  delete: async (id: string | number) => {
    return axiosPublic.delete<string>(`/genres/${id}`)
  },
}
