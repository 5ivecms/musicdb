import { Delete } from '@mui/icons-material'
import { IconButton, Stack } from '@mui/material'
import type { ReactElement } from 'react'

import type { ActionCellOptions, BaseItem } from '../types'
import ButtonActionEdit from './ButtonActionEdit'
import ButtonActionView from './ButtonActionView'

export interface ActionsCellProps<T extends BaseItem = BaseItem> extends ActionCellOptions<T> {
  item: T
}

const ActionsCell = <T extends BaseItem>({ item }: ActionsCellProps<T>): ReactElement => {
  return (
    <Stack direction="row" spacing={0}>
      <ButtonActionView item={item} />
      <ButtonActionEdit item={item} />
      <IconButton color="error">
        <Delete />
      </IconButton>
    </Stack>
  )
}

export default ActionsCell
