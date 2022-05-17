import { axiosPublic } from '../api/api.instances'
import { getGenresUrl } from '../config/api.config'

export const GenreService = {
  findAll: async (params: any = {}) => {
    return axiosPublic.get(getGenresUrl(), { params })
  },
}
