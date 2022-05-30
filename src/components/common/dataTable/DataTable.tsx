import { Delete, FilterAltOff, Refresh } from '@mui/icons-material'
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Checkbox,
  IconButton,
} from '@mui/material'
import { ChangeEvent, FC, MouseEvent, useCallback, useMemo, useState } from 'react'
import { DataTableProps } from './data-table.interfaces'
import DataTableDeleteDialog from './DataTableDeleteDialog'
import DataTableDeleteManyDialog from './DataTableDeleteManyDialog'
import DataTableFilter from './DataTableFilter'
import DataTableHead from './DataTableHead'
import DataTablePagination from './DataTablePagination'
import DataTableRow from './DataTableRow'
import { circularProgressFetching, fetchingSx, subActionsContainer, preloaderContainer, subAction } from './style.sx'

const DataTable: FC<DataTableProps> = ({
  rows,
  columns,
  order,
  orderBy,
  setOrder,
  setOrderBy,
  limit,
  total,
  loading,
  fetching,
  page,
  setPage,
  search,
  setSearch,
  actions = {},
  onRefresh,
  onDelete,
  onDeleteMany,
}) => {
  const fields = useMemo(() => columns.map((column) => column.field), [columns])
  const [selected, setSelected] = useState<number[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false)
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null)
  const [deleteManyDialogOpen, setDeleteManyDialogOpen] = useState<boolean>(false)

  const isSelected = useCallback((id: number) => selected.includes(id), [selected])

  const onSelect = useCallback(
    (id: number) => (_: MouseEvent<HTMLButtonElement>) => {
      setSelected((prevState) => {
        if (!prevState.includes(id)) {
          return [...prevState, id]
        }
        return prevState.filter((item) => item !== id)
      })
    },
    []
  )

  const onSelectAll = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelected(rows.map((row) => row.id))
        return
      }
      setSelected([])
    },
    [rows]
  )

  const handleRequestSort = useCallback(
    (_: MouseEvent<unknown>, property: any) => {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
    },
    [setOrder, setOrderBy, order, orderBy]
  )

  const handlePageChange = useCallback(
    (_: unknown, newPage: number) => {
      setPage(Number(newPage))
    },
    [setPage]
  )

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      const params = { ...search, [name]: value }
      const newParams = Object.keys(params).filter((param) => params[param] !== '')
      const newSearch = newParams.reduce((acc, item) => ({ ...acc, [item]: params[item] }), {})
      setSearch({ ...newSearch })
      setSelected([])
      setPage(1)
    },
    [search, setSearch, setPage]
  )

  const handleResetFilter = useCallback(() => {
    setSearch({})
  }, [setSearch])

  const toggleDeleteDialog = useCallback(() => {
    setDeleteDialogOpen((prevState) => !prevState)
  }, [])

  const handleDelete = useCallback(
    (id: number) => {
      setDeleteItemId(id)
      toggleDeleteDialog()
    },
    [toggleDeleteDialog]
  )

  const deleteConfirm = useCallback(() => {
    if (deleteItemId) {
      toggleDeleteDialog()
      onDelete(deleteItemId)
    }
  }, [deleteItemId, toggleDeleteDialog, onDelete])

  const toggleDeleteManyDialog = useCallback(() => {
    setDeleteManyDialogOpen((prevState) => !prevState)
  }, [])

  const confirmDeleteMany = useCallback(() => {
    onDeleteMany(selected.join(','))
    setSelected([])
    toggleDeleteManyDialog()
  }, [toggleDeleteManyDialog, onDeleteMany, setSelected, selected])

  return (
    <>
      <Box sx={!loading && fetching ? fetchingSx : {}}>
        {!loading && (
          <Paper>
            <TableContainer>
              <Table aria-labelledby="Data table">
                <DataTableHead
                  columns={columns}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  actions={Object.keys(actions).length > 0}
                />
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        indeterminate={selected.length > 0 && selected.length < limit}
                        checked={limit > 0 && selected.length === limit}
                        onChange={onSelectAll}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                      />
                    </TableCell>
                    <DataTableFilter onSearch={handleSearch} columns={columns} />
                    <TableCell sx={{ py: 1 }}>
                      <Box sx={subActionsContainer}>
                        <Box sx={subAction}>
                          {Object.keys(search).length > 0 && (
                            <IconButton color="default" aria-label="reset filter" onClick={handleResetFilter}>
                              <FilterAltOff />
                            </IconButton>
                          )}
                        </Box>
                        <Box sx={subAction}>
                          <IconButton color="default" aria-label="refresh" onClick={onRefresh}>
                            <Refresh />
                          </IconButton>
                        </Box>
                        <Box sx={subAction}>
                          {selected.length > 0 && (
                            <IconButton color="error" aria-label="delete selected" onClick={toggleDeleteManyDialog}>
                              <Delete />
                            </IconButton>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <DataTableRow
                      selected={isSelected(row.id)}
                      fields={fields}
                      row={row}
                      actions={actions}
                      onSelect={onSelect}
                      key={row.id}
                      onDelete={handleDelete}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <DataTablePagination total={total} limit={limit} page={page} onPageChange={handlePageChange} />
          </Paper>
        )}
        {!loading && fetching && <CircularProgress sx={circularProgressFetching} size={50} />}
      </Box>

      {loading && (
        <Box sx={preloaderContainer}>
          <CircularProgress />
        </Box>
      )}

      <DataTableDeleteDialog open={deleteDialogOpen} onClose={toggleDeleteDialog} onConfirm={deleteConfirm} />
      <DataTableDeleteManyDialog
        open={deleteManyDialogOpen}
        onClose={toggleDeleteManyDialog}
        onConfirm={confirmDeleteMany}
      />
    </>
  )
}

export default DataTable
