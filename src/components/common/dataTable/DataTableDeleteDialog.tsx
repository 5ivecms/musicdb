import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import type { FC } from 'react'

import type { DataTableDeleteDialogProps } from './data-table.interfaces'

const DataTableDeleteDialog: FC<DataTableDeleteDialogProps> = ({ open, onClose, onConfirm }) => (
  <Dialog
    aria-describedby="alert-dialog-description"
    aria-labelledby="alert-dialog-title"
    onClose={onClose}
    open={open}
  >
    <DialogTitle id="alert-dialog-title">Подтвердите удаление</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">Точно удалить запись?</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} variant="outlined">
        Нет
      </Button>
      <Button color="error" onClick={onConfirm} variant="contained" autoFocus>
        Да
      </Button>
    </DialogActions>
  </Dialog>
)

export default DataTableDeleteDialog
