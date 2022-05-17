import { browseRoutes } from '../../../core/config'
import { IHeaderMenuItem } from './header.interfaces'

export const headerMenu: IHeaderMenuItem[] = [
  {
    title: 'Релизы',
    url: browseRoutes.releases(),
  },
  {
    title: 'Треки',
    url: browseRoutes.tracks(),
  },
  {
    title: 'Исполнители',
    url: browseRoutes.artists(),
  },
  {
    title: 'Жанры',
    url: browseRoutes.genres(),
  },
]
