/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Delete, Edit } from '@mui/icons-material'
import type { SxProps } from '@mui/material'
import { Box, Button, Typography } from '@mui/material'
import type { FC } from 'react'
import { Link, useParams } from 'react-router-dom'

import { InfoTable, PageContent } from '../../../components/common'
import type { InfoTableColumn } from '../../../components/common/infoTable/info-table.interfaces'
import { PageHeader, PageTitle } from '../../../components/ui'
import { genresBrowseRoutes } from '../../../core/config'
import { useGenre } from '../../../core/hooks'
import { MainLayout } from '../../../layouts'

const actionButtons: SxProps = {
  '& > button': { ml: 1 },
}

const columns: InfoTableColumn[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'parentId', headerName: 'parentID' },
  { field: 'name', headerName: 'Название' },
  { field: 'shortName', headerName: 'Краткое название' },
  {
    field: 'slug',
    headerName: 'Slug',
    render: (value: string) => <Typography>{value}</Typography>,
  },
]

const GenreViewPage: FC = () => {
  const { genreId } = useParams()
  const { data, isLoading } = useGenre({ genreId: Number(genreId) })

  return (
    <MainLayout>
      <PageContent loading={isLoading}>
        <PageHeader
          left={<PageTitle title={`Жанр ${data?.name}`} />}
          right={
            <Box sx={actionButtons}>
              <Button component={Link} endIcon={<Edit />} to={genresBrowseRoutes.edit(genreId)} variant="contained">
                Редактировать
              </Button>
              <Button color="error" endIcon={<Delete />} variant="contained">
                Удалить
              </Button>
            </Box>
          }
          showBackButton
        />
        <InfoTable columns={columns} data={data} thWidth={200} />
      </PageContent>
    </MainLayout>
  )
}

export default GenreViewPage
