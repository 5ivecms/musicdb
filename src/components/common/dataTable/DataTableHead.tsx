/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unicorn/no-null */
import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { grey } from '@mui/material/colors'
import { visuallyHidden } from '@mui/utils'
import type { FC, MouseEvent } from 'react'
import { memo } from 'react'

import type { DataTableHeadProps } from './data-table.interfaces'

const DataTableHead: FC<DataTableHeadProps> = ({ columns, onRequestSort, order, orderBy }) => {
  const createSortHandler = (property: any) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }
  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: grey[100] }}>
        <TableCell />
        {columns.map((column) => (
          <TableCell
            key={column.field}
            align={column.numeric ? 'right' : 'left'}
            sortDirection={orderBy === column.field ? order : false}
            sx={{ boxSizing: 'border-box', width: column.width && column.width }}
          >
            <TableSortLabel
              active={orderBy === column.field}
              direction={orderBy === column.field ? order : 'asc'}
              onClick={createSortHandler(column.field)}
              sx={{ fontWeight: 'bold' }}
            >
              {column.headerName}
              {orderBy === column.field ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : (
                <></>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell width={120} />
      </TableRow>
    </TableHead>
  )
}

export default memo(DataTableHead)
