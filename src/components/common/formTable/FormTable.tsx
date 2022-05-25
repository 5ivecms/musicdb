import { ChangeEvent, MouseEvent, FC, useCallback, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from '@mui/material'
import FormTableHead from './FormTableHead'
import { useForm } from 'react-hook-form'

interface FormTableProps {
  columns: any[]
  rows: any[]
  loading: boolean
}

const FormTable: FC<FormTableProps> = ({ columns, rows, loading }) => {
  const [selected, setSelected] = useState<number[]>([])
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    register,
  } = useForm()

  const rowFields = useMemo(() => columns.map((column) => column.field), [columns])

  const isSelected = useCallback((id: number) => selected.includes(id), [selected])

  const onSelect = useCallback(
    (id: number) => (_: MouseEvent<HTMLButtonElement>) => {
      setSelected((prevState) => {
        if (!prevState.includes(id)) {
          return [...prevState, id]
        }
        return prevState.filter((item) => item !== id)
      })
    },
    []
  )

  const onSelectAll = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelected(rows.map((row) => row.id))
        return
      }
      setSelected([])
    },
    [rows]
  )

  const onSubmit = (data: any) => {
    console.log(data)
  }

  setValue('genres', [...rows])

  return (
    <Paper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TableContainer>
          <Table aria-labelledby="Form table" size="medium">
            <FormTableHead columns={columns} />
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" onClick={onSelect(row.id)} />
                  </TableCell>
                  {rowFields.map((fieldName, index) => (
                    <TableCell key={`row-${fieldName}${index}`}>
                      <TextField
                        {...register(`genres.${rowIndex}.${fieldName}`, {
                          required: columns[index].required ? 'Поле не может быть пустым' : false,
                        })}
                        size="small"
                        placeholder={`${columns[index].headerName}`}
                        error={Boolean(errors.genres?.[rowIndex]?.[fieldName]?.message)}
                        helperText={errors.genres?.[rowIndex]?.[fieldName]?.message}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {rows.length > 0 && (
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', p: 2, boxSizing: 'border-box' }}>
            <Button variant="contained" type="submit">
              Сохранить
            </Button>
          </Box>
        )}
      </form>
    </Paper>
  )
}

export default FormTable
