import { Box, Pagination, Typography } from '@mui/material'
import { FC, memo } from 'react'
import { DataTablePaginationProps } from './data-table.interfaces'
import { paginationContainer, paginationStat } from './style.sx'

const DataTablePagination: FC<DataTablePaginationProps> = ({ total, limit, page, onPageChange }) => {
  return (
    <Box sx={paginationContainer}>
      <Pagination
        size="medium"
        color="primary"
        count={Math.ceil(total / limit)}
        page={page}
        onChange={onPageChange}
        showFirstButton
        showLastButton
      />
      <Box sx={paginationStat}>
        <Typography fontSize={14}>Всего: {total}</Typography>
      </Box>
    </Box>
  )
}

export default memo(DataTablePagination)
