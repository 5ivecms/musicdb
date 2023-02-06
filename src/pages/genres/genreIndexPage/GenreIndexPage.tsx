import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import type { FC } from 'react'
import { Link } from 'react-router-dom'

import { GenresTable } from '../../../components/genres'
import { PageHeader, PageTitle } from '../../../components/ui'
import { genresBrowseRoutes } from '../../../core/config'
import { MainLayout } from '../../../layouts'

const GenreIndexPage: FC = () => {
  return (
    <MainLayout>
      <PageHeader
        left={<PageTitle title="Список жанров" />}
        right={
          <Button component={Link} endIcon={<Add />} to={genresBrowseRoutes.create()} variant="contained">
            Добавить
          </Button>
        }
      />
      <GenresTable />
    </MainLayout>
  )
}

export default GenreIndexPage
