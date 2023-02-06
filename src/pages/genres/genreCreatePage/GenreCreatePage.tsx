/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Box, Button, CircularProgress } from '@mui/material'
import type { FC } from 'react'

import { FormTable } from '../../../components/common'
import { PageHeader, PageTitle } from '../../../components/ui'
import { useGenresCreate } from '../../../core/hooks'
import { useZvukApi } from '../../../core/hooks/useZvukApi'
import { MainLayout } from '../../../layouts'

const columns = [
  { field: 'sourceId', headerName: 'sourceId', numeric: false, required: true, width: '150px' },
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

  const handleSubmit = async (data: any): Promise<void> => {
    await createManyGenresAsync(data)
  }

  return (
    <MainLayout>
      <PageHeader
        left={<PageTitle title="Добавить жанры" />}
        right={
          <Button onClick={() => getGenres()} variant="contained">
            Получить
          </Button>
        }
        showBackButton
      />
      <FormTable
        columns={columns}
        loading={isLoading || isLoadingCreateMany}
        onSubmit={handleSubmit}
        rows={dataGenres}
      />

      {isLoading && (
        <Box sx={{ display: isLoading ? 'none' : 'flex', justifyContent: 'center', my: 3 }}>
          <CircularProgress size={40} thickness={4} value={100} />
        </Box>
      )}
    </MainLayout>
  )
}

export default GenreCreatePage
