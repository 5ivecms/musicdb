import { ArrowBackIosNewOutlined } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { pageHeaderContainer, pageHeaderLeftSx, backIconSx } from './style.sx'

interface PageHeaderProps {
  left?: ReactNode
  right?: ReactNode
  showBackButton?: boolean
}

const PageHeader: FC<PageHeaderProps> = ({ left, right, showBackButton = false }) => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }

  return (
    <Box sx={{ ...pageHeaderContainer }}>
      <Box sx={pageHeaderLeftSx}>
        {showBackButton && (
          <IconButton sx={backIconSx} size="medium" color="info" aria-label="back" onClick={goBack}>
            <ArrowBackIosNewOutlined />
          </IconButton>
        )}
        {left || null}
      </Box>
      <Box>{right || null}</Box>
    </Box>
  )
}

export default PageHeader
