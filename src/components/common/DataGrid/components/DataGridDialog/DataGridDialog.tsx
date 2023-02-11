import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import type { FC } from 'react'

interface DataGridDialogProps {
  noText?: string
  onClose: () => void
  onConfirm: () => void
  open: boolean
  text: string
  title: string
  yesText?: string
}

const DataGridDialog: FC<DataGridDialogProps> = ({ noText, open, onClose, onConfirm, text, title, yesText }) => (
  <Dialog onClose={onClose} open={open}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{text}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>{noText}</Button>
      <Button onClick={onConfirm} autoFocus>
        {yesText}
      </Button>
    </DialogActions>
  </Dialog>
)

export default DataGridDialog
