import { artistsBrowseRoutes, genresBrowseRoutes, releasesBrowseRoutes, tracksBrowseRoutes } from '../../../core/config'
import { IHeaderMenuItem } from './header.interfaces'

export const headerMenu: IHeaderMenuItem[] = [
  {
    title: 'Релизы',
    url: releasesBrowseRoutes.index(),
  },
  {
    title: 'Треки',
    url: tracksBrowseRoutes.index(),
  },
  {
    title: 'Исполнители',
    url: artistsBrowseRoutes.index(),
  },
  {
    title: 'Жанры',
    url: genresBrowseRoutes.index(),
  },
]
