/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { FC } from 'react'
import { useCallback } from 'react'

import { useSongsData } from '../../../core/hooks/useSongsData'
import { DataTable } from '../../common'
import type { DataTableActions, DataTableHeaderColumnProps } from '../../common/dataTable/data-table.interfaces'

const columns: DataTableHeaderColumnProps[] = [
  { field: 'id', headerName: 'ID', numeric: false, width: '150px' },
  { field: 'zvukId', headerName: 'Zvuk ID', numeric: false },
  { field: 'status', headerName: 'Статус', numeric: false, width: '150px' },
]

const actions: DataTableActions = {
  canDelete: true,
  view: {
    field: 'id',
    url: '',
  },
}

const SongsDataTable: FC = () => {
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
    deleteSongsData,
    deleteManySongsData,
  } = useSongsData()

  const handleDelete = useCallback(
    async (id: number) => {
      await deleteSongsData(id)
    },
    [deleteSongsData]
  )

  const handleDeleteMany = useCallback(
    async (ids: string) => {
      await deleteManySongsData(ids)
    },
    [deleteManySongsData]
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

export default SongsDataTable
