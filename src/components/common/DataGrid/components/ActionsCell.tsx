import { Delete } from '@mui/icons-material'
import { IconButton, Stack } from '@mui/material'
import type { ReactElement } from 'react'
import { useContext } from 'react'

import type { DataGridContextState } from '../DataGridContext'
import { DataGridContext } from '../DataGridContext'
import type { ActionCellOptions, BaseItem } from '../types'
import ButtonActionEdit from './ButtonActionEdit'
import ButtonActionView from './ButtonActionView'

export interface ActionsCellProps<T extends BaseItem = BaseItem> extends ActionCellOptions<T> {
  item: T
}

const ActionsCell = <T extends BaseItem>({ item }: ActionsCellProps<T>): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const { onDelete } = useContext<DataGridContextState<T>>(DataGridContext)

  return (
    <Stack direction="row" spacing={0}>
      <ButtonActionView item={item} />
      <ButtonActionEdit item={item} />
      {onDelete !== undefined && (
        <IconButton color="error" onClick={() => onDelete(item.id)}>
          <Delete />
        </IconButton>
      )}
    </Stack>
  )
}

export default ActionsCell
