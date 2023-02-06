/* eslint-disable no-console */
import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import type { FC } from 'react'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'

import { DataTable } from '../../../components/common'
import type {
  DataTableActions,
  DataTableHeaderColumnProps,
} from '../../../components/common/dataTable/data-table.interfaces'
import { PageHeader, PageTitle } from '../../../components/ui'
import { artistsBrowseRoutes } from '../../../core/config'
import { useArtistSearch } from '../../../core/hooks/artists'
import { MainLayout } from '../../../layouts'

const columns: DataTableHeaderColumnProps[] = [
  { field: 'id', headerName: 'ID', numeric: false, width: '150px' },
  {
    field: 'sourceId',
    headerName: 'zvukId',
    numeric: false,
  },
  {
    field: 'title',
    headerName: 'Исполнитель',
    numeric: false,
  },
]

const actions: DataTableActions = {
  canDelete: true,
  edit: {
    field: 'id',
    url: artistsBrowseRoutes.edit(''),
  },
  view: {
    field: 'id',
    url: artistsBrowseRoutes.view(''),
  },
}

const ArtistsIndexPage: FC = () => {
  const {
    data,
    isLoading,
    isFetching,
    page,
    setPage,
    order,
    orderBy,
    setOrder,
    setOrderBy,
    search,
    setSearch,
    refetch,
  } = useArtistSearch()

  const handleDelete = useCallback((id: number) => {
    console.log(id)
  }, [])

  const handleDeleteMany = useCallback((ids: string) => {
    console.log(ids)
  }, [])

  return (
    <MainLayout>
      <PageHeader
        left={<PageTitle title="Список исполнителей" />}
        right={
          <Button component={Link} endIcon={<Add />} to={artistsBrowseRoutes.create()} variant="contained">
            Добавить
          </Button>
        }
      />

      <DataTable
        actions={actions}
        columns={columns}
        fetching={isFetching}
        limit={data?.limit || 10}
        loading={isLoading}
        onDelete={handleDelete}
        onDeleteMany={handleDeleteMany}
        onRefresh={refetch}
        order={order}
        orderBy={orderBy}
        page={Number(page)}
        rows={data?.items || []}
        search={search}
        setOrder={setOrder}
        setOrderBy={setOrderBy}
        setPage={setPage}
        setSearch={setSearch}
        total={data?.total || 0}
      />
    </MainLayout>
  )
}

export default ArtistsIndexPage
