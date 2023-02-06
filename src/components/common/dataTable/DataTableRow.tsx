/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Checkbox, TableCell, TableRow } from '@mui/material'
import type { FC } from 'react'
import { memo } from 'react'

import ActionCell from './ActionCell'
import type { DataTableRowProps } from './data-table.interfaces'

const DataTableRow: FC<DataTableRowProps> = ({ fields, actions = {}, row, onSelect, selected, onDelete, ...rest }) => (
  <TableRow aria-checked={selected} role="checkbox" selected={selected} tabIndex={-1} hover {...rest}>
    <TableCell padding="checkbox">
      <Checkbox checked={selected} color="primary" onClick={onSelect(row.id)} />
    </TableCell>
    {fields.map((field) => {
      return <TableCell key={`row-${field}`}>{row[field]}</TableCell>
    })}
    {Object.keys(actions) && (
      <TableCell width={120}>
        <ActionCell
          deleteAction={actions?.canDelete}
          editUrl={actions?.edit && `${actions?.edit?.url}${row[actions?.edit?.field]}`}
          itemId={row.id}
          onDelete={onDelete}
          viewUrl={actions?.view && `${actions?.view?.url}${row[actions?.view?.field]}`}
        />
      </TableCell>
    )}
  </TableRow>
)

export default memo(DataTableRow)
