export const API_URL = `http://localhost:5001/api`

export const genresAPIUrl = {
  findAll: () => `/genres`,
  findOne: (id: string | number) => `/genres/${id}`,
  createMany: () => `/genres/create-many`,
  deleteMany: () => `/genres/delete-many`,
}

export const ZvukAPIUrl = {
  parseGenres: () => `/zvuk-parser/parse-genres`,
  getGenres: () => `/zvuk-parser/genres`,
}
