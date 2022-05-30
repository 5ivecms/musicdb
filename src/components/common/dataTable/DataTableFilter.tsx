import { FC, memo } from 'react'
import { TableCell, TextField } from '@mui/material'
import { DataTableFilterProps } from './data-table.interfaces'

const DataTableFilter: FC<DataTableFilterProps> = ({ columns, onSearch }) => {
  return (
    <>
      {columns.map((column, index) => (
        <TableCell sx={{ p: 1 }} key={`filter-table-cell-${index}`}>
          <TextField
            onInput={onSearch}
            name={column.field}
            sx={{ width: '100%' }}
            label={column.headerName}
            color="primary"
            size="small"
          />
        </TableCell>
      ))}
    </>
  )
}

export default memo(DataTableFilter)
