import { FC, memo } from 'react'
import { TableCell, TextField } from '@mui/material'
import { DataTableFilterProps } from './data-table.interfaces'

const DataTableFilter: FC<DataTableFilterProps> = ({ onSearch }) => {
  return (
    <>
      <TableCell sx={{ p: 1 }}>
        <TextField onInput={onSearch} name="id" sx={{ width: '100%' }} label="id" color="primary" size="small" />
      </TableCell>
      <TableCell sx={{ p: 1 }}>
        <TextField
          onInput={onSearch}
          name="name"
          sx={{ width: '100%' }}
          label="Название"
          color="primary"
          size="small"
        />
      </TableCell>
      <TableCell sx={{ p: 1 }}>
        <TextField
          onInput={onSearch}
          name="shortName"
          sx={{ width: '100%' }}
          label="Краткое название"
          color="primary"
          size="small"
        />
      </TableCell>
      <TableCell sx={{ p: 1 }}>
        <TextField onInput={onSearch} name="slug" sx={{ width: '100%' }} label="Slug" color="secondary" size="small" />
      </TableCell>
    </>
  )
}

export default memo(DataTableFilter)
