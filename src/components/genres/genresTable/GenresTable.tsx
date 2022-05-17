import { FC } from 'react'
import { browseRoutes } from '../../../core/config'
import { DataTable } from '../../common'
import ActionCell from '../../common/dataTable/ActionCell'
import { DataTableHeaderColumnProps } from '../../common/dataTable/DataTableHead'
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
  const { data, isLoading, page, setPage } = useGenres()

  // const actionCell = {
  //   width: 140,
  //   field: 'action',
  //   headerName: '',
  //   hideable: false,
  //   sortable: false,
  //   editable: false,
  //   groupable: false,
  //   filterable: false,
  //   pinnable: false,
  //   disableColumnMenu: true,
  //   renderCell: (cellValues) => {
  //     const { id } = cellValues.row
  //     return (
  //       <ActionCell editUrl={browseRoutes.genreEdit(id)} viewUrl={browseRoutes.genreView(id)} deleteAction={true} />
  //     )
  //   },
  // }

  return (
    <DataTable
      rows={data?.items || []}
      rowCount={data?.total || 0}
      columns={columns}
      loading={isLoading}
      page={Number(page) - 1}
      onPageChange={(newPage) => setPage(Number(newPage) + 1)}
    />
  )
}

export default GenresTable
