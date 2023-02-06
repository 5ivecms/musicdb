export const genresBrowseRoutes = {
  create: (): string => `/genres/create`,
  edit: (to: number | string = ':genreId'): string => `/genres/edit/${to}`,
  index: (): string => '/genres',
  view: (to: number | string = ':genreId'): string => `/genres/view/${to}`,
}

export const artistsBrowseRoutes = {
  create: (): string => `/artists/create`,
  edit: (to: number | string = ':artistId'): string => `/artists/edit/${to}`,
  index: (): string => '/artists',
  view: (to: number | string = ':artistId'): string => `/artists/view/${to}`,
}

export const tracksBrowseRoutes = {
  create: (): string => `/tracks/create`,
  edit: (to: number | string = ':trackId'): string => `/tracks/edit/${to}`,
  index: (): string => '/tracks',
  view: (to: number | string = ':trackId'): string => `/tracks/view/${to}`,
}

export const releasesBrowseRoutes = {
  create: (): string => `/releases/create`,
  edit: (to: number | string = ':releaseId'): string => `/releases/edit/${to}`,
  index: (): string => '/releases',
  view: (to: number | string = ':releaseId'): string => `/releases/view/${to}`,
}

export const zvukDataBrowseRoutes = {
  create: (): string => `/zvuk-data/create`,
  index: (): string => '/zvuk-data',
  sitemaps: (): string => `/zvuk-data/sitemaps`,
  sitemapsCreate: (): string => `/zvuk-data/sitemaps/create`,
}
