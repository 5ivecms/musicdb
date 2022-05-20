import {
  Box,
  Checkbox,
  CircularProgress,
  Paper,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material'
import { FC } from 'react'
import ActionCell from './ActionCell'
import { DataTableProps } from './data-table.interfaces'
import DataTableHead from './DataTableHead'

const DataTable: FC<DataTableProps> = ({
  rows,
  columns,
  limit,
  total,
  loading,
  fetching,
  page,
  onPageChange,
  actions = {},
}) => {
  const fields = columns.map((column) => column.field)
  console.log(page, total, limit)
  return (
    <>
      <Box sx={!loading && fetching ? fetchingSx : {}}>
        {!loading && (
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
                  rowCount={limit}
                  actions={Object.keys(actions).length > 0}
                />
                <TableBody>
                  {rows.map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        <TableCell padding="checkbox">
                          <Checkbox color="primary" />
                        </TableCell>
                        {fields.map((field) => {
                          return <TableCell key={`row-${field}`}>{row[field]}</TableCell>
                        })}
                        {Object.keys(actions) && (
                          <TableCell width={120}>
                            <ActionCell
                              deleteAction={actions?.canDelete}
                              viewUrl={actions?.view && `${actions?.view?.url}${row[actions?.view?.field]}`}
                              editUrl={actions?.edit && `${actions?.edit?.url}${row[actions?.edit?.field]}`}
                            />
                          </TableCell>
                        )}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={total}
              rowsPerPage={limit}
              page={page}
              onPageChange={onPageChange}
            />
          </Paper>
        )}
        {!loading && fetching && <CircularProgress sx={fetchingCircularProgress} size={50} />}
      </Box>

      {loading && (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </>
  )
}

const fetchingSx: SxProps = {
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    bgcolor: 'rgba(255, 255, 255, 0.5)',
    zIndex: 2,
  },
}

const fetchingCircularProgress: SxProps = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 3,
  m: 'auto',
}

export default DataTable
