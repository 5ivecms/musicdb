/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { FC } from 'react'
import { useCallback } from 'react'

import { genresBrowseRoutes } from '../../../core/config'
import { DataTable } from '../../common'
import type { DataTableActions, DataTableHeaderColumnProps } from '../../common/dataTable/data-table.interfaces'
import { useGenres } from '../useGenres'

const columns: DataTableHeaderColumnProps[] = [
  { field: 'id', headerName: 'ID', numeric: false, width: '150px' },
  { field: 'parentId', headerName: 'parentID', numeric: false, width: '150px' },
  {
    field: 'name',
    headerName: 'Название',
    numeric: false,
  },
  {
    field: 'shortName',
    headerName: 'Краткое название',
    numeric: false,
  },
  {
    field: 'slug',
    headerName: 'Slug',
    numeric: false,
  },
]

const actions: DataTableActions = {
  canDelete: true,
  edit: {
    field: 'id',
    url: genresBrowseRoutes.edit(''),
  },
  view: {
    field: 'id',
    url: genresBrowseRoutes.view(''),
  },
}

const GenresTable: FC = () => {
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
    refresh,
    deleteGenre,
    deleteGenres,
  } = useGenres()

  const handleDelete = useCallback(
    async (id: number) => {
      await deleteGenre(id)
    },
    [deleteGenre]
  )

  const handleDeleteMany = useCallback(
    async (ids: string) => {
      await deleteGenres(ids)
    },
    [deleteGenres]
  )

  return (
    <DataTable
      actions={actions}
      columns={columns}
      fetching={isFetching}
      limit={data?.limit || 10}
      loading={isLoading}
      onDelete={handleDelete}
      onDeleteMany={handleDeleteMany}
      onRefresh={refresh}
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
  )
}

export default GenresTable
