import { ChangeEvent, MouseEvent, FC, useCallback, useState } from 'react'
import { Box, Button, Paper, Table, TableBody, TableContainer } from '@mui/material'
import FormTableHead from './FormTableHead'
import { useForm } from 'react-hook-form'
import FormTableRow from './FormTableRow'

interface FormTableProps {
  columns: any[]
  rows: any[]
  loading: boolean
  onSubmit: <T>(data: T) => void
}

const FormTable: FC<FormTableProps> = ({ columns, rows, loading, onSubmit }) => {
  const [selected, setSelected] = useState<number[]>([])
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    register,
  } = useForm()

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

  const handleFormSubmit = ({ data }: any) => {
    const items = data.filter((item: any) => selected.includes(item.id))
    onSubmit(items)
  }

  setValue('data', [...rows])

  return (
    <Paper>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <TableContainer>
          <Table aria-labelledby="Form table" size="medium">
            <FormTableHead
              columns={columns}
              onSelectAll={onSelectAll}
              checkboxIndeterminate={selected.length > 0 && selected.length < rows.length}
              checkboxChecked={rows.length > 0 && selected.length === rows.length}
            />
            <TableBody>
              {rows.map((row, rowIndex) => (
                <FormTableRow
                  register={register}
                  onSelect={onSelect}
                  selected={isSelected(row.id)}
                  row={row}
                  errors={errors}
                  rowIndex={rowIndex}
                  columns={columns}
                  key={`row-${row.id}`}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {rows.length > 0 && (
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', p: 2, boxSizing: 'border-box' }}>
            <Button variant="contained" type="submit" disabled={loading}>
              Сохранить
            </Button>
          </Box>
        )}
      </form>
    </Paper>
  )
}

export default FormTable
