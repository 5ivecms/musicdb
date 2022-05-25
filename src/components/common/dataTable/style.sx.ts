import { SxProps } from '@mui/material'

export const paginationContainer: SxProps = {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignContent: 'center',
  alignItems: 'center',
  py: 2,
}

export const paginationStat: SxProps = {
  mr: 2,
}

export const circularProgressFetching: SxProps = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 3,
  m: 'auto',
}

export const fetchingSx: SxProps = {
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: 2,
  },
}

export const subActionsContainer: SxProps = {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
}

export const subAction: SxProps = {
  width: '40px',
}

export const preloaderContainer: SxProps = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
}
