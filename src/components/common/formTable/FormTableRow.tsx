import { FC, memo, MouseEvent } from 'react'
import { Checkbox, TableCell, TableRow, TextField } from '@mui/material'

interface FormTableRowProps {
  rowIndex: number
  row: any
  columns: any[]
  selected: boolean
  onSelect: (id: number) => (_: MouseEvent<HTMLButtonElement>) => void
  register: any
  errors: {
    [x: string]: any
  }
}

const FormTableRow: FC<FormTableRowProps> = ({
  errors,
  columns,
  row,
  selected,
  onSelect,
  register,
  rowIndex,
  ...rest
}) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} selected={selected} {...rest}>
      <TableCell padding="checkbox">
        <Checkbox color="primary" onClick={onSelect(row.id)} checked={selected} />
      </TableCell>
      {columns.map((column, index) => (
        <TableCell key={`row-${column}${index}`}>
          <TextField
            {...register(`data.${rowIndex}.${column.field}`, {
              required: columns[index].required ? 'Поле не может быть пустым' : false,
            })}
            size="small"
            placeholder={`${columns[index].headerName}`}
            error={Boolean(errors.data?.[rowIndex]?.[column.field]?.message)}
            helperText={errors.data?.[rowIndex]?.[column.field]?.message}
          />
        </TableCell>
      ))}
    </TableRow>
  )
}

export default memo(FormTableRow)
