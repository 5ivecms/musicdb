import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { Add } from '@mui/icons-material'
import MainLayout from '../../../layouts/MainLayout'
import { GenresTable } from '../../../components/genres'
import { PageHeader, PageTitle } from '../../../components/ui'
import { genresBrowseRoutes } from '../../../core/config'

const GenreIndexPage: FC = () => {
  return (
    <MainLayout>
      <PageHeader
        left={<PageTitle title="Список жанров" />}
        right={
          <Button variant="contained" component={Link} to={genresBrowseRoutes.create()} endIcon={<Add />}>
            Добавить
          </Button>
        }
      />
      <GenresTable />
    </MainLayout>
  )
}

export default GenreIndexPage
