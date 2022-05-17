import { Checkbox, Paper, Table, TableCell, TableContainer, TableRow } from '@mui/material'

import { FC } from 'react'
import DataTableHead, { DataTableHeaderColumnProps } from './DataTableHead'

interface DataTableProps {
  columns: DataTableHeaderColumnProps[]
  rows: any[]
  loading: boolean
  rowCount: number
  page: number
  onPageChange: (page: number) => void
}

const DataTable: FC<DataTableProps> = ({ rows, columns, rowCount, loading, page, onPageChange }) => {
  const fields = columns.map((column) => column.field)
  console.log(rows)
  return (
    <Paper>
      <TableContainer>
        <Table aria-labelledby="tableTitle">
          <DataTableHead
            columns={columns}
            order={'asc'}
            orderBy={'id'}
            numSelected={0}
            onRequestSort={() => console.log('сортируем')}
            onSelectAllClick={() => console.log('выбираем все')}
            rowCount={10}
          />
          {rows.map((row) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                <TableCell padding="checkbox">
                  <Checkbox color="primary" />
                </TableCell>
                {fields.map((field) => {
                  return <TableCell>{row[field]}</TableCell>
                })}
              </TableRow>
            )
          })}
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default DataTable
