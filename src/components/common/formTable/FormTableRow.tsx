/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Checkbox, TableCell, TableRow, TextField } from '@mui/material'
import type { FC, MouseEvent } from 'react'
import { memo } from 'react'

import type { FormTableColumn } from './form-table.interfaces'

interface FormTableRowProps {
  columns: FormTableColumn[]
  errors: Record<string, any>
  onSelect: (id: number) => (_: MouseEvent<HTMLButtonElement>) => void
  register: any
  row: any
  rowIndex: number
  selected: boolean
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
    <TableRow role="checkbox" selected={selected} tabIndex={-1} hover {...rest}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} color="primary" onClick={onSelect(row.id)} />
      </TableCell>
      {columns.map((column, index) => (
        <TableCell key={`row-${column}${index}`}>
          {column?.render === undefined ? (
            <TextField
              {...register(`data.${rowIndex}.${column.field}`, {
                required: columns[index].required ? 'Поле не может быть пустым' : false,
              })}
              disabled={columns[index].disabled || false}
              error={Boolean(errors.data?.[rowIndex]?.[column.field]?.message)}
              helperText={errors.data?.[rowIndex]?.[column.field]?.message}
              placeholder={`${columns[index].headerName}`}
              size="small"
              sx={{ background: '#fff', borderRadius: '4px' }}
              variant="outlined"
              fullWidth
            />
          ) : (
            <>{column.render(row)}</>
          )}
        </TableCell>
      ))}
    </TableRow>
  )
}

export default memo(FormTableRow)
