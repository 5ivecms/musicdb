import { Box, Pagination, Typography } from '@mui/material'
import type { FC } from 'react'
import { memo } from 'react'

import type { DataTablePaginationProps } from './data-table.interfaces'
import { paginationContainer, paginationStat } from './style.sx'

const DataTablePagination: FC<DataTablePaginationProps> = ({ total, limit, page, onPageChange }) => {
  return (
    <Box sx={paginationContainer}>
      <Pagination
        color="primary"
        count={Math.ceil(total / limit)}
        onChange={onPageChange}
        page={page}
        size="medium"
        showFirstButton
        showLastButton
      />
      <Box sx={paginationStat}>
        <Typography fontSize={14}>Всего: {total.toLocaleString()}</Typography>
      </Box>
    </Box>
  )
}

export default memo(DataTablePagination)
