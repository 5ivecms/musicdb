/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unicorn/no-null */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Delete, FilterAltOff, Refresh } from '@mui/icons-material'
import {
  Box,
  Checkbox,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import type { ChangeEvent, FC, MouseEvent } from 'react'
import { useCallback, useMemo, useState } from 'react'

import type { DataTableProps } from './data-table.interfaces'
import DataTableDeleteDialog from './DataTableDeleteDialog'
import DataTableDeleteManyDialog from './DataTableDeleteManyDialog'
import DataTableFilter from './DataTableFilter'
import DataTableHead from './DataTableHead'
import DataTablePagination from './DataTablePagination'
import DataTableRow from './DataTableRow'
import { circularProgressFetching, fetchingSx, preloaderContainer, subAction, subActionsContainer } from './style.sx'

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
                  actions={Object.keys(actions).length > 0}
                  columns={columns}
                  onRequestSort={handleRequestSort}
                  order={order}
                  orderBy={orderBy}
                />
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={limit > 0 && selected.length === limit}
                        color="primary"
                        indeterminate={selected.length > 0 && selected.length < limit}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                        onChange={onSelectAll}
                      />
                    </TableCell>
                    <DataTableFilter columns={columns} onSearch={handleSearch} />
                    <TableCell sx={{ py: 1 }}>
                      <Box sx={subActionsContainer}>
                        <Box sx={subAction}>
                          {Object.keys(search).length > 0 && (
                            <IconButton aria-label="reset filter" color="default" onClick={handleResetFilter}>
                              <FilterAltOff />
                            </IconButton>
                          )}
                        </Box>
                        <Box sx={subAction}>
                          <IconButton aria-label="refresh" color="default" onClick={onRefresh}>
                            <Refresh />
                          </IconButton>
                        </Box>
                        <Box sx={subAction}>
                          {selected.length > 0 && (
                            <IconButton aria-label="delete selected" color="error" onClick={toggleDeleteManyDialog}>
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
                      key={row.id}
                      actions={actions}
                      fields={fields}
                      onDelete={handleDelete}
                      onSelect={onSelect}
                      row={row}
                      selected={isSelected(row.id)}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <DataTablePagination limit={limit} onPageChange={handlePageChange} page={page} total={total} />
          </Paper>
        )}
        {!loading && fetching && <CircularProgress size={50} sx={circularProgressFetching} />}
      </Box>

      {loading && (
        <Box sx={preloaderContainer}>
          <CircularProgress />
        </Box>
      )}

      <DataTableDeleteDialog onClose={toggleDeleteDialog} onConfirm={deleteConfirm} open={deleteDialogOpen} />
      <DataTableDeleteManyDialog
        onClose={toggleDeleteManyDialog}
        onConfirm={confirmDeleteMany}
        open={deleteManyDialogOpen}
      />
    </>
  )
}

export default DataTable
