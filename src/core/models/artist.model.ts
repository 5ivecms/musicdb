/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TrackModel } from './track.model'

export interface ArtistModel {
  description?: string
  id: number
  image: string
  releases?: any
  slug: string
  songs?: TrackModel[]
  sourceId: number
  title: string
}
