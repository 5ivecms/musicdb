import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import { artistsBrowseRoutes, genresBrowseRoutes, releasesBrowseRoutes, tracksBrowseRoutes } from '../core/config'
import {
  ArtistsIndexPage,
  GenreCreatePage,
  GenreEditPage,
  GenreIndexPage,
  GenreViewPage,
  NotFoundPage,
  ReleasesIndexPage,
  TracksIndexPage,
} from '../pages'

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />

      <Route path={genresBrowseRoutes.index()} element={<GenreIndexPage />} />
      <Route path={genresBrowseRoutes.view()} element={<GenreViewPage />} />
      <Route path={genresBrowseRoutes.create()} element={<GenreCreatePage />} />
      <Route path={genresBrowseRoutes.edit()} element={<GenreEditPage />} />

      <Route path={releasesBrowseRoutes.index()} element={<ReleasesIndexPage />} />
      <Route path={artistsBrowseRoutes.index()} element={<ArtistsIndexPage />} />
      <Route path={tracksBrowseRoutes.index()} element={<TracksIndexPage />} />
    </Routes>
  )
}

export default AppRouter
