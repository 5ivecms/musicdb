import { Delete, Edit } from '@mui/icons-material'
import type { SxProps } from '@mui/material'
import { Alert, Box, Button } from '@mui/material'
import type { FC } from 'react'
import { Link, useParams } from 'react-router-dom'

import { InfoTable, PageContent } from '../../../components/common'
import type { InfoTableColumn } from '../../../components/common/infoTable/info-table.interfaces'
import { PageHeader, PageTitle } from '../../../components/ui'
import { tracksBrowseRoutes } from '../../../core/config'
import { useTrack } from '../../../core/hooks/tracks'
import { prepareImageSrc } from '../../../core/utils/image'
import { MainLayout } from '../../../layouts'

const columns: InfoTableColumn[] = [
  { field: 'image', headerName: 'thumb', render: (value: string) => <img alt="" src={prepareImageSrc(value, 300)} /> },
  { field: 'id', headerName: 'ID' },
  { field: 'sourceId', headerName: 'zvukId' },
  { field: 'credits', headerName: 'Исполнители' },
  { field: 'title', headerName: 'Название' },
  { field: 'slug', headerName: 'slug' },
  { field: 'duration', headerName: 'Длительность, сек' },
  { field: 'template', headerName: 'Шаблон исполнителей' },
]

const actionButtons: SxProps = {
  '& > button': { ml: 1 },
  whiteSpace: 'nowrap',
}

const TrackViewPage: FC = () => {
  const { trackId } = useParams()
  const { data, isLoading, isError } = useTrack(Number(trackId))

  return (
    <MainLayout>
      <PageContent loading={isLoading}>
        {data !== undefined && (
          <PageHeader
            left={<PageTitle title={`${data.credits} - ${data.title}`} />}
            right={
              <Box sx={actionButtons}>
                <Button component={Link} endIcon={<Edit />} to={tracksBrowseRoutes.edit(trackId)} variant="contained">
                  Редактировать
                </Button>
                <Button color="error" endIcon={<Delete />} variant="contained">
                  Удалить
                </Button>
              </Box>
            }
            showBackButton
          />
        )}

        <InfoTable columns={columns} data={data} thWidth={200} />
        {isError && <Alert severity="error">Ой, ой, ой... У нас ошибка!</Alert>}
      </PageContent>
    </MainLayout>
  )
}

export default TrackViewPage
