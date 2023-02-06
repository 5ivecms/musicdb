import type { ZvukImage } from './image'

export interface ZvukRelease {
  artist_ids: number[]
  artist_names: string[]
  availability: number
  credits: string
  date: number
  explicit: boolean
  genre_ids: number[]
  has_image: boolean
  id: number
  image: ZvukImage
  label_id: number
  price: number
  search_credits: string
  search_title: string
  template: string
  title: string
  track_ids: number[]
  type: string
}

export interface ZvukReleaseSearchItem {
  aname: string
  doc_type: string
  duration: number
  id: number
  score: number
  title: string
}
