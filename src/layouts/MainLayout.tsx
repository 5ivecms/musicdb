import { Box, Container } from '@mui/material'
import type { FC, ReactNode } from 'react'

import { Header } from '../components/ui'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ paddingBottom: '100px' }}>
      <Header />
      <Container maxWidth="xl">{children}</Container>
    </Box>
  )
}

export default MainLayout
