import { Delete, Edit } from '@mui/icons-material'
import type { SxProps } from '@mui/material'
import { Alert, Box, Button } from '@mui/material'
import type { FC } from 'react'
import { Link, useParams } from 'react-router-dom'

import { InfoTable, PageContent } from '../../../components/common'
import type { InfoTableColumn } from '../../../components/common/infoTable/info-table.interfaces'
import { PageHeader, PageTitle } from '../../../components/ui'
import { artistsBrowseRoutes } from '../../../core/config'
import { useArtist } from '../../../core/hooks/artists'
import { prepareImageSrc } from '../../../core/utils/image'
import { MainLayout } from '../../../layouts'

const actionButtons: SxProps = {
  '& > button': { ml: 1 },
  whiteSpace: 'nowrap',
}

const columns: InfoTableColumn[] = [
  { field: 'image', headerName: 'thumb', render: (value: string) => <img alt="" src={prepareImageSrc(value, 300)} /> },
  { field: 'id', headerName: 'ID' },
  { field: 'sourceId', headerName: 'zvukId' },
  { field: 'title', headerName: 'Название' },
  { field: 'slug', headerName: 'slug' },
  { field: 'description', headerName: 'Описание' },
]

const ArtistViewPage: FC = () => {
  const { artistId } = useParams()
  const { data, isLoading, isError } = useArtist()

  return (
    <MainLayout>
      <PageContent loading={isLoading}>
        <PageHeader
          left={<PageTitle title="Исполнитель" />}
          right={
            <Box sx={actionButtons}>
              <Button component={Link} endIcon={<Edit />} to={artistsBrowseRoutes.edit(artistId)} variant="contained">
                Редактировать
              </Button>
              <Button color="error" endIcon={<Delete />} variant="contained">
                Удалить
              </Button>
            </Box>
          }
        />
        <InfoTable columns={columns} data={data} thWidth={200} />
        {isError && <Alert severity="error">Ой, ой, ой... У нас ошибка!</Alert>}
      </PageContent>
    </MainLayout>
  )
}

export default ArtistViewPage
