export const genresBrowseRoutes = {
  index: () => '/genres',
  create: () => `/genres/create`,
  view: (to: string | number = ':genreId') => `/genres/view/${to}`,
  edit: (to: string | number = ':genreId') => `/genres/edit/${to}`,
}

export const artistsBrowseRoutes = {
  index: () => '/artists',
  create: () => `/artists/create`,
  view: (to: string | number = ':artistId') => `/artists/view/${to}`,
  edit: (to: string | number = ':artistId') => `/artists/edit/${to}`,
}

export const tracksBrowseRoutes = {
  index: () => '/tracks',
  create: () => `/tracks/create`,
  view: (to: string | number = ':trackId') => `/tracks/view/${to}`,
  edit: (to: string | number = ':trackId') => `/tracks/edit/${to}`,
}

export const releasesBrowseRoutes = {
  index: () => '/releases',
  create: () => `/releases/create`,
  view: (to: string | number = ':releaseId') => `/releases/view/${to}`,
  edit: (to: string | number = ':releaseId') => `/releases/edit/${to}`,
}
