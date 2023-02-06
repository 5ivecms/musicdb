import {
  artistsBrowseRoutes,
  genresBrowseRoutes,
  releasesBrowseRoutes,
  tracksBrowseRoutes,
  zvukDataBrowseRoutes,
} from '../../../core/config'
import type { IHeaderMenuItem } from './header.interfaces'

export const headerMenu: IHeaderMenuItem[] = [
  {
    title: 'Треки',
    url: tracksBrowseRoutes.index(),
  },
  {
    title: 'Релизы',
    url: releasesBrowseRoutes.index(),
  },
  {
    title: 'Исполнители',
    url: artistsBrowseRoutes.index(),
  },
  {
    title: 'Жанры',
    url: genresBrowseRoutes.index(),
  },
  {
    title: 'ZvukData',
    url: zvukDataBrowseRoutes.index(),
  },
  {
    title: 'Zvuk Sitemaps',
    url: zvukDataBrowseRoutes.sitemaps(),
  },
]
