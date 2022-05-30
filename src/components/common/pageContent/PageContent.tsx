import { FC, ReactNode } from 'react'
import { Box } from '@mui/material'
import Preloader from '../preloader/Preloader'
import { style } from './style.sx'

interface PageContentProps {
  loading: boolean
  children: ReactNode
}

const PageContent: FC<PageContentProps> = ({ loading, children }) => {
  return <Box sx={style}>{loading ? <Preloader /> : children}</Box>
}

export default PageContent
