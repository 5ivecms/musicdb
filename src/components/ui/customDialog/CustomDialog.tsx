import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import type { FC } from 'react'

interface CustomDialogProps {
  btnAgreeText: string
  btnCloseText: string
  description: string
  onClose: () => void
  onConfirm: () => unknown
  open: boolean
  title: string
}

const CustomDialog: FC<CustomDialogProps> = ({
  open,
  title,
  description,
  btnAgreeText,
  btnCloseText,
  onConfirm,
  onClose,
}) => {
  return (
    <Dialog
      aria-describedby="delete-dialog-description"
      aria-labelledby="delete-dialog-title"
      onClose={onClose}
      open={open}
    >
      {title !== '' && <DialogTitle id="delete-dialog-title">{title}</DialogTitle>}
      {description !== '' && (
        <DialogContent>
          <DialogContentText id="delete-dialog-description">{description}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onClose}>{btnCloseText}</Button>
        <Button onClick={onConfirm} autoFocus>
          {btnAgreeText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomDialog
