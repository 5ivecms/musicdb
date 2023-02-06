import type { ZvukImage } from './image'

export interface ZvukArtist {
  description: string
  has_image: boolean
  has_page: boolean
  id: number
  image: ZvukImage
  search_title: string
  title: string
}

export interface ArtistSearchItem {
  doc_type: 'artist'
  id: number
  score: number
  title: string
}

export interface CreateArtistFields {
  zvukUrl: string
}
