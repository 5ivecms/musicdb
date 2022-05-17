import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import { browseRoutes } from '../core/config'
import { ArtistsIndexPage, GenreIndexPage, NotFoundPage, ReleasesIndexPage, TracksIndexPage } from '../pages'

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route path={browseRoutes.genres()} element={<GenreIndexPage />} />
      <Route path={browseRoutes.releases()} element={<ReleasesIndexPage />} />
      <Route path={browseRoutes.artists()} element={<ArtistsIndexPage />} />
      <Route path={browseRoutes.tracks()} element={<TracksIndexPage />} />
    </Routes>
  )
}

export default AppRouter
