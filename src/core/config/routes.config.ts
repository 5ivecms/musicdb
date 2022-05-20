export const browseRoutes = {
  releases: () => `/releases`,

  genres: () => `/genres`,
  genreView: (to: string | number = ':genreId') => `/genres/view/${to}`,
  genreEdit: (to: string | number = ':genreId') => `/genres/edit/${to}`,
  genreCreate: (to: string | number = ':genreId') => `/genres/create/${to}`,

  artists: () => `/artists`,
  tracks: () => `/tracks`,
}
