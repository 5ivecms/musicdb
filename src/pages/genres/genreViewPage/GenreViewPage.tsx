import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Delete, Edit } from '@mui/icons-material'
import { Box, Button, SxProps, Typography } from '@mui/material'
import { PageHeader, PageTitle } from '../../../components/ui'
import { genresBrowseRoutes } from '../../../core/config'
import { MainLayout } from '../../../layouts'
import { useGenre } from '../../../core/hooks'
import { InfoTable, PageContent } from '../../../components/common'
import { InfoTableColumn } from '../../../components/common/infoTable/info-table.interfaces'

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
          showBackButton
          left={<PageTitle title={`Жанр ${data?.name}`} />}
          right={
            <Box sx={actionButtons}>
              <Button variant="contained" component={Link} to={genresBrowseRoutes.edit(genreId)} endIcon={<Edit />}>
                Редактировать
              </Button>
              <Button variant="contained" color="error" endIcon={<Delete />}>
                Удалить
              </Button>
            </Box>
          }
        />
        <InfoTable data={data} columns={columns} thWidth={200} />
      </PageContent>
    </MainLayout>
  )
}

const actionButtons: SxProps = {
  '& > button': { ml: 1 },
}

export default GenreViewPage
