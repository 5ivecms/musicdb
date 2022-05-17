import { Box, Container } from '@mui/material'
import { FC, ReactNode } from 'react'
import { Header } from '../components/ui'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box>
      <Header />
      <Container maxWidth="xl">{children}</Container>
    </Box>
  )
}

export default MainLayout
