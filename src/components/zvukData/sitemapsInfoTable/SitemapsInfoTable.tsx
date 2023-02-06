import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import type { FC } from 'react'

import type { SitemapsInfo } from '../../../core/types'

interface SitemapsInfoTableProps {
  status: SitemapsInfo
}

const SitemapsInfoTable: FC<SitemapsInfoTableProps> = ({ status }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="sitemap status table">
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              <Typography sx={{ fontWeight: 'bold', m: 0 }}>Новые</Typography>
            </TableCell>
            <TableCell align="left">{status.new}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              <Typography sx={{ fontWeight: 'bold', m: 0 }}>Завершенные</Typography>
            </TableCell>
            <TableCell align="left">{status.completed}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              <Typography sx={{ fontWeight: 'bold', m: 0 }}>В процессе</Typography>
            </TableCell>
            <TableCell align="left">{status.process}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              <Typography sx={{ fontWeight: 'bold', m: 0 }}>Всего</Typography>
            </TableCell>
            <TableCell align="left">{status.total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SitemapsInfoTable
