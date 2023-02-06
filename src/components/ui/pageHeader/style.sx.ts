import type { SxProps } from '@mui/material'

export const pageHeaderContainer: SxProps = { display: 'flex', justifyContent: 'space-between', my: 3, width: '100%' }

export const pageHeaderLeftSx: SxProps = {
  alignItems: 'center',
  display: 'flex',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

export const backIconSx: SxProps = {
  mr: 1,
}
