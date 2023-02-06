import type { AxiosResponse } from 'axios'
import { stringify } from 'qs'

import { axiosPublic } from '../api/api.instances'
import { artistsAPIUrl } from '../config/api.config'
import type { ArtistModel } from '../models'
import type { FindAllResponse, SearchParams } from '../types'

export const ArtistService = {
  create: (data: { artistId: number }): Promise<AxiosResponse<ArtistModel>> => {
    return axiosPublic.post<ArtistModel>(artistsAPIUrl.create(), { data })
  },

  findOne: (id: number): Promise<AxiosResponse<ArtistModel>> => {
    return axiosPublic.get<ArtistModel>(artistsAPIUrl.findOne(id))
  },

  search: (params?: SearchParams<Record<string, string>>): Promise<AxiosResponse<FindAllResponse<ArtistModel>>> => {
    return axiosPublic.get<FindAllResponse<ArtistModel>>(artistsAPIUrl.search(), {
      params,
      paramsSerializer: () => stringify(params),
    })
  },
}
