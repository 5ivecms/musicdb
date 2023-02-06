/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import type { MUIDataTableColumnDef } from 'mui-datatables'
import type { FC } from 'react'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'

import { PageHeader, PageTitle } from '../../../components/ui'
import { releasesBrowseRoutes } from '../../../core/config'
import MainLayout from '../../../layouts/MainLayout'

const columns: MUIDataTableColumnDef[] = [
  { label: 'ID', name: 'id' },
  { label: 'Название', name: 'title' },
]

const ReleasesIndexPage: FC = () => {
  const handleDelete = useCallback((id: number) => {
    console.log(id)
  }, [])

  const handleDeleteMany = useCallback((ids: string) => {
    console.log(ids)
  }, [])

  return (
    <MainLayout>
      <PageHeader
        left={<PageTitle title="Список релизов" />}
        right={
          <Button component={Link} endIcon={<Add />} to={releasesBrowseRoutes.create()} variant="contained">
            Добавить
          </Button>
        }
      />
    </MainLayout>
  )
}

export default ReleasesIndexPage
