import { FC } from 'react'
import { genresBrowseRoutes } from '../../../core/config'
import { DataTable } from '../../common'
import { DataTableActions, DataTableHeaderColumnProps } from '../../common/dataTable/data-table.interfaces'
import { useGenres } from '../useGenres'

const columns: DataTableHeaderColumnProps[] = [
  { field: 'id', headerName: 'ID', numeric: false, width: '150px' },
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
  view: {
    field: 'id',
    url: genresBrowseRoutes.view(''),
  },
  edit: {
    field: 'id',
    url: genresBrowseRoutes.edit(''),
  },
  canDelete: true,
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
  } = useGenres()

  return (
    <DataTable
      loading={isLoading}
      fetching={isFetching}
      rows={data?.items || []}
      total={data?.total || 0}
      limit={data?.limit || 10}
      columns={columns}
      page={Number(page)}
      setPage={setPage}
      order={order}
      setOrder={setOrder}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
      search={search}
      setSearch={setSearch}
      actions={actions}
      onRefresh={refresh}
    />
  )
}

export default GenresTable
