import { ArrowBackIosNewOutlined } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import type { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { backIconSx, pageHeaderContainer, pageHeaderLeftSx } from './style.sx'

interface PageHeaderProps {
  left?: ReactNode
  right?: ReactNode
  showBackButton?: boolean
}

const PageHeader: FC<PageHeaderProps> = ({ left, right, showBackButton = false }) => {
  const navigate = useNavigate()

  const goBack = (): void => {
    navigate(-1)
  }

  return (
    <Box sx={{ ...pageHeaderContainer }}>
      <Box sx={pageHeaderLeftSx}>
        {showBackButton && (
          <IconButton aria-label="back" color="info" onClick={goBack} size="medium" sx={backIconSx}>
            <ArrowBackIosNewOutlined />
          </IconButton>
        )}
        {left || undefined}
      </Box>
      <Box>{right || undefined}</Box>
    </Box>
  )
}

export default PageHeader
