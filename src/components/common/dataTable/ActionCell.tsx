import { Delete, Edit, RemoveRedEye } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface ActionCellProps {
  deleteAction?: boolean
  viewUrl?: string
  editUrl?: string
}

const ActionCell: FC<ActionCellProps> = ({ deleteAction, viewUrl, editUrl }) => {
  return (
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
      {viewUrl && (
        <IconButton color="primary" aria-label="upload picture" component={Link} to={viewUrl}>
          <RemoveRedEye />
        </IconButton>
      )}
      {editUrl && (
        <IconButton color="success" aria-label="upload picture" component={Link} to={editUrl}>
          <Edit />
        </IconButton>
      )}
      {deleteAction === true && (
        <IconButton color="error" aria-label="upload picture" component={Link} to={'/'}>
          <Delete />
        </IconButton>
      )}
    </Box>
  )
}

export default ActionCell
