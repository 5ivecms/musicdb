export interface GenreModel {
  id: number
  name: string
  parentId: number
  parentSourceId: number
  shortName: string
  slug: string
  sourceId: number
}

export interface CreateManyGenresDto {
  id: number
  name: string
  parentSourceId: number
  sourceId: number
  sub?: Record<
    string,
    {
      id: number
      name: string
      shortName: string
    }
  >
}
