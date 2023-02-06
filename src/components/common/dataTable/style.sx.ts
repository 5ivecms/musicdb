import type { SxProps } from '@mui/material'

export const paginationContainer: SxProps = {
  alignContent: 'center',
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  py: 2,
  width: '100%',
}

export const paginationStat: SxProps = {
  mr: 2,
}

export const circularProgressFetching: SxProps = {
  bottom: 0,
  left: 0,
  m: 'auto',
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 3,
}

export const fetchingSx: SxProps = {
  '&:before': {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    bottom: 0,
    content: '""',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2,
  },
  position: 'relative',
}

export const subActionsContainer: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
}

export const subAction: SxProps = {
  width: '40px',
}

export const preloaderContainer: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
}
