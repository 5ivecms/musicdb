import { FC, useCallback } from 'react'
import { browseRoutes } from '../../../core/config'
import { DataTable } from '../../common'
import { DataTableHeaderColumnProps } from '../../common/dataTable/data-table.interfaces'
import { useGenres } from '../useGenres'

const columns: DataTableHeaderColumnProps[] = [
  { field: 'id', headerName: 'ID', numeric: false },
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

const GenresTable: FC = () => {
  const { data, isLoading, isFetching, page, setPage } = useGenres()

  const handlePageChange = useCallback(
    (_: unknown, newPage: number) => {
      setPage(Number(newPage) + 1)
    },
    [setPage]
  )

  return (
    <DataTable
      rows={data?.items || []}
      total={data?.total || 0}
      limit={data?.limit || 10}
      columns={columns}
      loading={isLoading}
      fetching={isFetching}
      page={Number(page) - 1}
      onPageChange={handlePageChange}
      actions={{
        view: {
          field: 'id',
          url: browseRoutes.genreView(''),
        },
        edit: {
          field: 'id',
          url: browseRoutes.genreEdit(''),
        },
        canDelete: true,
      }}
    />
  )
}

export default GenresTable
