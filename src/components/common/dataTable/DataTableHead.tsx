import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { FC, MouseEvent } from 'react'
import { visuallyHidden } from '@mui/utils'
import { DataTableHeadProps } from './data-table.interfaces'

const DataTableHead: FC<DataTableHeadProps> = ({
  columns,
  numSelected,
  onRequestSort,
  onSelectAllClick,
  order,
  orderBy,
  rowCount,
}) => {
  const createSortHandler = (property: any) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {columns.map((column) => (
          <TableCell
            key={column.field}
            align={column.numeric ? 'right' : 'left'}
            sortDirection={orderBy === column.field ? order : false}
          >
            <TableSortLabel
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

export default DataTableHead
