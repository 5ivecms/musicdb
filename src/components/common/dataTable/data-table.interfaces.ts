/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ChangeEvent, MouseEvent } from 'react'

export type Order = 'asc' | 'desc'

export interface DataTableHeaderColumnProps {
  field: string
  headerName: string
  numeric: boolean
  width?: string
}

export interface DataTableHeadProps {
  actions?: boolean
  columns: DataTableHeaderColumnProps[]
  onRequestSort: (event: MouseEvent<unknown>, property: any) => void
  order: Order
  orderBy: string
}

export interface DataTableFilterProps {
  columns: any[]
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

export interface DataTableAction {
  field: string
  url: string
}

export interface DataTableActions {
  canDelete?: true
  edit?: DataTableAction
  view?: DataTableAction
}

export interface DataTableRowProps {
  actions?: DataTableActions
  fields: string[]
  onDelete: (id: number) => void
  onSelect: (id: number) => (_: MouseEvent<HTMLButtonElement>) => void
  row: any
  selected: boolean
}

export interface DataTablePaginationProps {
  limit: number
  onPageChange: (event: unknown, newPage: number) => void
  page: number
  total: number
}

export interface DataTableProps {
  actions?: DataTableActions
  columns: DataTableHeaderColumnProps[]
  fetching: boolean
  limit: number
  loading: boolean
  onDelete: (id: number) => void
  onDeleteMany: (ids: string) => void
  onRefresh: () => void
  order: Order
  orderBy: string
  page: number
  rows: any[]
  search: Record<string, string>
  setOrder: (order: Order) => void
  setOrderBy: (orderBy: string) => void
  setPage: (newPage: number) => void
  setSearch: (data: Record<string, string>) => void
  total: number
}

export interface DataTableDeleteDialogProps {
  onClose: () => void
  onConfirm: () => void
  open: boolean
}

export interface DataTableDeleteManyDialogProps {
  onClose: () => void
  onConfirm: () => void
  open: boolean
}
