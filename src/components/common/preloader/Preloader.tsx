import { Box, CircularProgress } from '@mui/material'
import { FC } from 'react'
import { style } from './style.sx'

const Preloader: FC = () => {
  return (
    <Box sx={style}>
      <CircularProgress />
    </Box>
  )
}

export default Preloader
