import { FC } from 'react'
import { Typography } from '@mui/material'

interface PageTitleProps {
  title: string
}

const PageTitle: FC<PageTitleProps> = ({ title }) => (
  <Typography variant="h4" component="h1">
    {title}
  </Typography>
)

export default PageTitle
