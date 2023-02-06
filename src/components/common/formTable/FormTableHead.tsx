/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material'
import { grey } from '@mui/material/colors'
import type { ChangeEvent, FC } from 'react'

interface FormTableHeadProps {
  checkboxChecked: boolean
  checkboxIndeterminate: boolean
  columns: any[]
  onSelectAll: (event: ChangeEvent<HTMLInputElement>) => void
}

const FormTableHead: FC<FormTableHeadProps> = ({ columns, onSelectAll, checkboxIndeterminate, checkboxChecked }) => {
  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: grey[100] }}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={checkboxChecked}
            color="primary"
            indeterminate={checkboxIndeterminate}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
            onChange={onSelectAll}
          />
        </TableCell>
        {columns.map((column) => (
          <TableCell
            key={column.field}
            align={column.numeric ? 'right' : 'left'}
            sx={{ boxSizing: 'border-box', fontWeight: 'bold', width: column.width && column.width }}
          >
            {column.headerName}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default FormTableHead
