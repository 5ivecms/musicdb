import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { FC, memo, MouseEvent } from 'react'
import { visuallyHidden } from '@mui/utils'
import { grey } from '@mui/material/colors'
import { DataTableHeadProps } from './data-table.interfaces'

const DataTableHead: FC<DataTableHeadProps> = ({ columns, onRequestSort, order, orderBy }) => {
  const createSortHandler = (property: any) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }
  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: grey[100] }}>
        <TableCell></TableCell>
        {columns.map((column) => (
          <TableCell
            sx={{ width: column.width && column.width, boxSizing: 'border-box' }}
            key={column.field}
            align={column.numeric ? 'right' : 'left'}
            sortDirection={orderBy === column.field ? order : false}
          >
            <TableSortLabel
              sx={{ fontWeight: 'bold' }}
              active={orderBy === column.field}
              direction={orderBy === column.field ? order : 'asc'}
              onClick={createSortHandler(column.field)}
            >
              {column.headerName}
              {orderBy === column.field ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell width={120}></TableCell>
      </TableRow>
    </TableHead>
  )
}

export default memo(DataTableHead)
