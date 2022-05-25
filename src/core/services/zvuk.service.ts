import { axiosPublic } from '../api/api.instances'
import { ZvukAPIUrl } from '../config/api.config'

export const ZvukService = {
  parseGenres: async () => {
    return axiosPublic.get(ZvukAPIUrl.parseGenres())
  },

  getGenres: async () => {
    return axiosPublic.get(ZvukAPIUrl.getGenres())
  },
}
