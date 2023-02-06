export const API_URL = `http://localhost:5001/api`

export const genresAPIUrl = {
  createMany: (): string => `/genres/create-many`,
  deleteMany: (): string => `/genres/delete-many`,
  findAll: (): string => `/genres`,
  findOne: (id: number | string): string => `/genres/${id}`,
}

export const tracksAPIUrl = {
  findOne: (id: number): string => `/songs/${id}`,
  search: (): string => `/songs/search`,
}

export const artistsAPIUrl = {
  create: (): string => `/artists`,
  findOne: (id: number): string => `/artists/${id}`,
  search: (): string => `/artists/search`,
}

export const releasesAPIUrl = {
  findAll: (): string => `/releases`,
  search: (): string => `/releases/search`,
}

export const ZvukAPIUrl = {
  getGenres: (): string => `/zvuk-parser/genres`,
  parseArtist: (): string => `/zvuk-parser/parse-artist`,
  parseGenres: (): string => `/zvuk-parser/parse-genres`,
  parseSitemaps: (): string => `/zvuk-parser/parse-sitemaps`,
  parseSongIds: (): string => `/zvuk-parser/parse-song-ids`,
  parseTracksBySourceIds: (): string => `/zvuk-parser/parse-songs-by-source-ids`,
  search: (): string => `/zvuk-parser/search`,
  stream: (): string => `/zvuk-parser/stream`,
}

export const ZvukSitemapsAPIUrl = {
  delete: (id: number | string): string => `/zvuk/sitemaps/${id}`,
  deleteAll: (): string => `/zvuk/sitemaps/delete-all`,
  findAll: (): string => `/zvuk/sitemaps`,
  info: (): string => `/zvuk/sitemaps/info`,
}

export const songsDataAPIUrl = {
  delete: (id: number | string): string => `/songs-data/${id}`,
  deleteAll: (): string => `/songs-data/delete-all`,
  deleteMany: (): string => `/songs-data/delete-many`,
  findAll: (): string => `/songs-data`,
}
