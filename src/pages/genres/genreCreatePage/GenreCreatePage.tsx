import { FC } from 'react'
import { Button } from '@mui/material'
import { FormTable } from '../../../components/common'
import { PageHeader, PageTitle } from '../../../components/ui'
import { useGenresCreate } from '../../../core/hooks'
import { useZvukApi } from '../../../core/hooks/useZvukApi'
import { MainLayout } from '../../../layouts'

const columns = [
  { field: 'sourceId', headerName: 'sourceId', numeric: false, width: '150px', required: true },
  {
    field: 'parentSourceId',
    headerName: 'parentSourceId',
    numeric: false,
    required: true,
  },
  {
    field: 'name',
    headerName: 'Название',
    numeric: false,
    required: true,
  },
  {
    field: 'shortName',
    headerName: 'Краткое название',
    numeric: false,
    required: false,
  },
  {
    field: 'slug',
    headerName: 'Slug',
    numeric: false,
    required: false,
  },
]

const GenreCreatePage: FC = () => {
  const { genres, getGenres, isLoading } = useZvukApi()
  const { createManyGenresAsync, isLoadingCreateMany } = useGenresCreate()

  const dataGenres = genres.reduce((acc: any[], item: any) => {
    let subGenres: any[] = []
    if (item.sub) {
      subGenres = item.sub.reduce((acc: any[], sub: any) => {
        const newSub = { ...sub, parentSourceId: item.id, sourceId: sub.id }
        return [...acc, newSub]
      }, [])
    }
    const newItem = { ...item, parentSourceId: 0, sourceId: item.id }
    return [...acc, newItem, ...subGenres]
  }, [])

  const handleSubmit = async (data: any) => {
    await createManyGenresAsync(data)
  }

  return (
    <MainLayout>
      <PageHeader
        left={<PageTitle title="Добавить жанры" />}
        right={
          <Button variant="contained" onClick={() => getGenres()}>
            Получить
          </Button>
        }
        showBackButton
      />
      <FormTable
        columns={columns}
        rows={dataGenres}
        loading={isLoading || isLoadingCreateMany}
        onSubmit={handleSubmit}
      />
    </MainLayout>
  )
}

export default GenreCreatePage
