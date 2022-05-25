import { FC } from 'react'
import { TableCell, TableHead, TableRow } from '@mui/material'

import { grey } from '@mui/material/colors'

interface FormTableHeadProps {
  columns: any[]
}

const FormTableHead: FC<FormTableHeadProps> = ({ columns }) => {
  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: grey[100] }}>
        <TableCell></TableCell>
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
