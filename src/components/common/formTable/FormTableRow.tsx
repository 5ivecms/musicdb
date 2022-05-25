import { FC, memo, MouseEvent } from 'react'
import { Checkbox, OutlinedInput, TableCell, TableRow } from '@mui/material'

interface FormTableRowProps {
  fields: any[]
  row: any
  columns: any[]
  selected: boolean
  onSelect: (id: number) => (_: MouseEvent<HTMLButtonElement>) => void
  register: any
}

const FormTableRow: FC<FormTableRowProps> = ({ fields, columns, row, selected, onSelect, register, ...rest }) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} {...rest}>
      <TableCell padding="checkbox">
        <Checkbox color="primary" onClick={onSelect(row.id)} checked={selected} />
      </TableCell>
      {fields.map((field, index) => {
        return (
          <TableCell key={`row-${field}`}>
            <OutlinedInput
              placeholder={`${columns[index].headerName}`}
              value={row[field]}
              {...register(`genres[${row.id}][${field}]`)}
            />
          </TableCell>
        )
      })}
    </TableRow>
  )
}

export default memo(FormTableRow)
