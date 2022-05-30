export interface GenreModel {
  id: number
  parentId: number
  name: string
  slug: string
  shortName: string
  sourceId: number
  parentSourceId: number
}

export interface CreateManyGenresDto {
  id: number
  name: string
  parentSourceId: number
  sourceId: number
  sub?: {
    [key: string]: {
      id: number
      name: string
      shortName: string
    }
  }
}
