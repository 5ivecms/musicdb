import type { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import {
  artistsBrowseRoutes,
  genresBrowseRoutes,
  releasesBrowseRoutes,
  tracksBrowseRoutes,
  zvukDataBrowseRoutes,
} from '../core/config'
import {
  ArtistCreatePage,
  ArtistsIndexPage,
  ArtistViewPage,
  GenreCreatePage,
  GenreEditPage,
  GenreIndexPage,
  GenreViewPage,
  NotFoundPage,
  ReleaseCreatePage,
  ReleasesIndexPage,
  ZvukDataIndexPage,
} from '../pages'
import { TrackCreatePage, TrackEditPage, TracksIndexPage, TrackViewPage } from '../pages/tracks'
import ZvukDataCreatePage from '../pages/zvukData/zvukDataCreatePage/ZvukDataCreatePage'
import { ZvukSitemapsCreatePage, ZvukSitemapsIndexPage } from '../pages/zvukData/zvukSitemaps'

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route element={<NotFoundPage />} path="*" />

      <Route element={<GenreIndexPage />} path={genresBrowseRoutes.index()} />
      <Route element={<GenreViewPage />} path={genresBrowseRoutes.view()} />
      <Route element={<GenreCreatePage />} path={genresBrowseRoutes.create()} />
      <Route element={<GenreEditPage />} path={genresBrowseRoutes.edit()} />

      <Route element={<ReleasesIndexPage />} path={releasesBrowseRoutes.index()} />
      <Route element={<ReleaseCreatePage />} path={releasesBrowseRoutes.create()} />

      <Route element={<ArtistsIndexPage />} path={artistsBrowseRoutes.index()} />
      <Route element={<ArtistCreatePage />} path={artistsBrowseRoutes.create()} />
      <Route element={<ArtistViewPage />} path={artistsBrowseRoutes.view()} />

      <Route element={<TracksIndexPage />} path={tracksBrowseRoutes.index()} />
      <Route element={<TrackCreatePage />} path={tracksBrowseRoutes.create()} />
      <Route element={<TrackViewPage />} path={tracksBrowseRoutes.view()} />
      <Route element={<TrackEditPage />} path={tracksBrowseRoutes.edit()} />

      <Route element={<ZvukDataIndexPage />} path={zvukDataBrowseRoutes.index()} />
      <Route element={<ZvukDataCreatePage />} path={zvukDataBrowseRoutes.create()} />

      <Route element={<ZvukSitemapsIndexPage />} path={zvukDataBrowseRoutes.sitemaps()} />
      <Route element={<ZvukSitemapsCreatePage />} path={zvukDataBrowseRoutes.sitemapsCreate()} />
    </Routes>
  )
}

export default AppRouter
