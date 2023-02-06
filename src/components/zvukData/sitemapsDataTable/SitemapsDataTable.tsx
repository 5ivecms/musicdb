/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { FC } from 'react'
import { useCallback } from 'react'

import { useZvukSitemaps } from '../../../core/hooks/useZvukSitemaps'
import { DataTable } from '../../common'
import type { DataTableActions, DataTableHeaderColumnProps } from '../../common/dataTable/data-table.interfaces'

const columns: DataTableHeaderColumnProps[] = [
  { field: 'id', headerName: 'ID', numeric: false, width: '150px' },
  { field: 'url', headerName: 'Url', numeric: false },
  {
    field: 'type',
    headerName: 'Тип',
    numeric: false,
  },
  {
    field: 'status',
    headerName: 'Статус',
    numeric: false,
  },
]

const actions: DataTableActions = {
  canDelete: true,
  edit: {
    field: 'id',
    url: '',
  },
}

const SitemapsDataTable: FC = () => {
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
    deleteSitemap,
  } = useZvukSitemaps()

  const handleDelete = useCallback(
    async (id: number) => {
      await deleteSitemap(id)
    },
    [deleteSitemap]
  )

  const handleDeleteMany = (): void => {
    console.error('handleDeleteMany')
  }

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

export default SitemapsDataTable
