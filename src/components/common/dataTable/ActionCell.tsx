import { Delete, Edit, RemoveRedEye } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import type { FC } from 'react'
import { memo } from 'react'
import { Link } from 'react-router-dom'

interface ActionCellProps {
  deleteAction?: boolean
  editUrl?: string
  itemId: number
  onDelete: (id: number) => void
  viewUrl?: string
}

const ActionCell: FC<ActionCellProps> = ({ deleteAction, viewUrl, editUrl, onDelete, itemId }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      {viewUrl && (
        <IconButton aria-label="view" color="primary" component={Link} to={viewUrl}>
          <RemoveRedEye />
        </IconButton>
      )}
      {editUrl && (
        <IconButton aria-label="edit" color="success" component={Link} to={editUrl}>
          <Edit />
        </IconButton>
      )}
      {deleteAction === true && (
        <IconButton aria-label="delete" color="error" onClick={() => onDelete(itemId)}>
          <Delete />
        </IconButton>
      )}
    </Box>
  )
}

export default memo(ActionCell)
