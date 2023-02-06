import type { ZvukArtist } from './artist'
import type { ZvukImage } from './image'
import type { ZvukRelease } from './release'

export type TrackSearchFields = {
  limit: number
  mode: string
  query: string
}

export interface ZvukTrack {
  artist_ids: number[]
  artist_names: string[]
  availability: number
  condition: string
  credits: string
  duration: number
  explicit: boolean
  genres: number[]
  has_flac: boolean
  highest_quality: string
  id: number
  image: ZvukImage
  lyrics: number | null
  position: number
  price: number
  release_id: number
  release_title: string
  search_credits: string
  search_title: string
  template: string
  title: string
}

export interface ZvukTrackSearch {
  aname: string
  doc_type: string
  id: number
  score: number
  title: string
}

export interface TrackSearchResponse {
  artists: Record<string, ZvukArtist>
  existTracks: number[]
  releases: Record<string, ZvukRelease>
  tracks: Record<string, ZvukTrack>
}
