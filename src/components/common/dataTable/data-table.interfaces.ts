import { ChangeEvent, MouseEvent } from 'react'

export type Order = 'asc' | 'desc'

export interface DataTableHeaderColumnProps {
  field: string
  headerName: string
  numeric: boolean
}

export interface DataTableHeadProps {
  columns: DataTableHeaderColumnProps[]
  numSelected: number
  order: Order
  orderBy: string
  rowCount: number
  onRequestSort: (event: MouseEvent<unknown>, property: any) => void
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void
  actions?: boolean
}

export interface DataTableProps {
  columns: DataTableHeaderColumnProps[]
  rows: any[]
  loading: boolean
  fetching: boolean
  limit: number
  total: number
  page: number
  actions?: DataTableActions
  onPageChange: (event: unknown, newPage: number) => void
}

export interface DataTableAction {
  field: string
  url: string
}

export interface DataTableActions {
  view?: DataTableAction
  edit?: DataTableAction
  canDelete?: true
}
