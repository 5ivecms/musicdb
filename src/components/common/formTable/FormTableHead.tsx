import { ChangeEvent, FC } from 'react'
import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material'

import { grey } from '@mui/material/colors'

interface FormTableHeadProps {
  columns: any[]
  onSelectAll: (event: ChangeEvent<HTMLInputElement>) => void
  checkboxIndeterminate: boolean
  checkboxChecked: boolean
}

const FormTableHead: FC<FormTableHeadProps> = ({ columns, onSelectAll, checkboxIndeterminate, checkboxChecked }) => {
  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: grey[100] }}>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={checkboxIndeterminate}
            checked={checkboxChecked}
            onChange={onSelectAll}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {columns.map((column) => (
          <TableCell
            sx={{ width: column.width && column.width, boxSizing: 'border-box', fontWeight: 'bold' }}
            key={column.field}
            align={column.numeric ? 'right' : 'left'}
          >
            {column.headerName}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default FormTableHead
