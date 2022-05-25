import { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import { Delete, Edit, RemoveRedEye } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'

interface ActionCellProps {
  itemId: number
  deleteAction?: boolean
  viewUrl?: string
  editUrl?: string
  onDelete: (id: number) => void
}

const ActionCell: FC<ActionCellProps> = ({ deleteAction, viewUrl, editUrl, onDelete, itemId }) => {
  return (
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
      {viewUrl && (
        <IconButton color="primary" aria-label="view" component={Link} to={viewUrl}>
          <RemoveRedEye />
        </IconButton>
      )}
      {editUrl && (
        <IconButton color="success" aria-label="edit" component={Link} to={editUrl}>
          <Edit />
        </IconButton>
      )}
      {deleteAction === true && (
        <IconButton color="error" aria-label="delete" onClick={() => onDelete(itemId)}>
          <Delete />
        </IconButton>
      )}
    </Box>
  )
}

export default memo(ActionCell)
