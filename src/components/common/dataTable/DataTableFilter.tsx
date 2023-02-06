/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/no-array-index-key */
import { TableCell, TextField } from '@mui/material'
import type { FC } from 'react'
import { memo } from 'react'

import type { DataTableFilterProps } from './data-table.interfaces'

const DataTableFilter: FC<DataTableFilterProps> = ({ columns, onSearch }) => {
  return (
    <>
      {columns.map((column, index) => (
        <TableCell key={`filter-table-cell-${index}`} sx={{ p: 1 }}>
          <TextField
            color="primary"
            label={column.headerName}
            name={column.field}
            onInput={onSearch}
            size="small"
            sx={{ width: '100%' }}
          />
        </TableCell>
      ))}
    </>
  )
}

export default memo(DataTableFilter)
