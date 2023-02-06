import type { AxiosResponse } from 'axios'
import { stringify } from 'qs'

import { axiosPublic } from '../api/api.instances'
import { tracksAPIUrl } from '../config/api.config'
import type { TrackModel } from '../models'
import type { FindAllResponse, SearchParams } from '../types'

export const TrackService = {
  findOne: (id: number): Promise<AxiosResponse<TrackModel>> => {
    return axiosPublic.get<TrackModel>(tracksAPIUrl.findOne(id))
  },

  search: (params: SearchParams<Record<string, string>>): Promise<AxiosResponse<FindAllResponse<TrackModel>>> => {
    return axiosPublic.get<FindAllResponse<TrackModel>>(tracksAPIUrl.search(), {
      params,
      paramsSerializer: () => stringify(params),
    })
  },
}
