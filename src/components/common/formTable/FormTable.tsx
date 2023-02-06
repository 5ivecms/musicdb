/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Box, Button, Paper, Table, TableBody, TableContainer } from '@mui/material'
import type { ChangeEvent, FC, MouseEvent } from 'react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import type { FormTableProps } from './form-table.interfaces'
import FormTableHead from './FormTableHead'
import FormTableRow from './FormTableRow'

const FormTable: FC<FormTableProps> = ({ columns, rows, loading, onSubmit, addRowProps }) => {
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
              checkboxChecked={rows.length > 0 && selected.length === rows.length}
              checkboxIndeterminate={selected.length > 0 && selected.length < rows.length}
              columns={columns}
              onSelectAll={onSelectAll}
            />
            <TableBody>
              {rows.map((row, rowIndex) => {
                let props = {}

                if (addRowProps !== undefined) {
                  props = { ...addRowProps(row) }
                }
                return (
                  <FormTableRow
                    key={`row-${row.id}`}
                    columns={columns}
                    errors={errors}
                    onSelect={onSelect}
                    register={register}
                    row={row}
                    rowIndex={rowIndex}
                    selected={isSelected(row.id)}
                    {...props}
                  />
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {rows.length > 0 && (
          <Box sx={{ boxSizing: 'border-box', display: 'flex', justifyContent: 'flex-end', p: 2, width: '100%' }}>
            <Button disabled={loading} type="submit" variant="contained">
              Сохранить
            </Button>
          </Box>
        )}
      </form>
    </Paper>
  )
}

export default FormTable
