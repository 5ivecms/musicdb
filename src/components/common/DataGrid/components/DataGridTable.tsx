/* eslint-disable react/jsx-key */
/* eslint-disable import/no-extraneous-dependencies */
import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import type { MouseEvent, ReactElement } from 'react'
import { useCallback, useContext } from 'react'

import type { DataGridContextState } from '../DataGridContext'
import { DataGridContext } from '../DataGridContext'
import type { BaseItem } from '../types'
import ActionsCell from './ActionsCell'
import DataGridFilter from './DataGridFilter'
import { DataGridPagination } from './DataGridPagination'
import DataGridTableHead from './DataGridTableHead'

const DataGridTable = <T extends BaseItem>(): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const { columns, data, selectedRows, setSelectedRows } = useContext<DataGridContextState<T>>(DataGridContext)

  const table = useReactTable({
    columns,
    data: data?.items ?? [],
    getCoreRowModel: getCoreRowModel(),
  })

  const isSelected = useCallback((id: number) => selectedRows.includes(id), [selectedRows])

  const onSelectRow = useCallback(
    (id: number) => (_: MouseEvent<HTMLButtonElement>) => {
      setSelectedRows((prevState) => {
        if (!prevState.includes(id)) {
          return [...prevState, id]
        }
        return prevState.filter((item) => item !== id)
      })
    },
    [setSelectedRows]
  )

  return (
    <Paper>
      <TableContainer>
        <Table>
          <DataGridTableHead headerGroups={table.getHeaderGroups()} />
          <DataGridFilter />
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              const selected = isSelected(Number(row.original.id))
              return (
                <TableRow key={row.id} selected={selected} hover>
                  <TableCell padding="checkbox">
                    <Checkbox checked={selected} color="primary" onClick={onSelectRow(Number(row.original.id))} />
                  </TableCell>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      {...{
                        key: cell.id,
                        style: {
                          width: cell.column.getSize(),
                        },
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  <TableCell>
                    <ActionsCell item={row.original} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <DataGridPagination />
      </TableContainer>
    </Paper>
  )
}

export default DataGridTable
