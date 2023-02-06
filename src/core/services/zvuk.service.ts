/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { AxiosResponse } from 'axios'

import { axiosPublic } from '../api/api.instances'
import { ZvukAPIUrl } from '../config/api.config'
import type { ArtistModel } from '../models'
import type { ZvukSitemapModel } from '../models/zvuk-sitemap.model'
import type { TrackSearchFields, TrackSearchResponse } from '../types/tracks'

export const ZvukService = {
  getGenres: async () => {
    return axiosPublic.get(ZvukAPIUrl.getGenres())
  },

  getStreamUrl: (id: number): Promise<AxiosResponse<string>> => {
    return axiosPublic.get<string>(ZvukAPIUrl.stream(), { params: { id } })
  },

  parseArtist: (artistId: number): Promise<AxiosResponse<ArtistModel>> => {
    return axiosPublic.post<ArtistModel>(ZvukAPIUrl.parseArtist(), { artistId })
  },

  parseSitemaps: async (type: string) => {
    return axiosPublic.get<any>(ZvukAPIUrl.parseSitemaps(), { params: { type } })
  },

  parseSongIds: async () => {
    return axiosPublic.get<ZvukSitemapModel>(ZvukAPIUrl.parseSongIds())
  },

  parseTracksBySourceIds: (sourceIds: number[]) => {
    return axiosPublic.post<any>(ZvukAPIUrl.parseTracksBySourceIds(), { sourceIds })
  },

  searchTracks: async (params: TrackSearchFields) => {
    return axiosPublic.get<TrackSearchResponse>(ZvukAPIUrl.search(), { params })
  },
}
