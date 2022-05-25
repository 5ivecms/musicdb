import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { FC } from 'react'
import { DataTableDeleteDialogProps } from './data-table.interfaces'

const DataTableDeleteDialog: FC<DataTableDeleteDialogProps> = ({ open, onClose, onConfirm }) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Подтвердите удаление</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">Точно удалить запись?</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button variant="outlined" onClick={onClose}>
        Нет
      </Button>
      <Button variant="contained" color="error" onClick={onConfirm} autoFocus>
        Да
      </Button>
    </DialogActions>
  </Dialog>
)

export default DataTableDeleteDialog
