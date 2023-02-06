/* eslint-disable @typescript-eslint/no-empty-function */
import type { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { createContext } from 'react'

import type { BaseItem, DataGridProps, LEGAL_ANY, Order } from './types'

export type DataGridContextState<T extends BaseItem = BaseItem> = DataGridProps<T> & {
  handleSelectAll: (event: ChangeEvent<HTMLInputElement>) => void
  selectedRows: number[]
  setSelectedRows: Dispatch<SetStateAction<number[]>>
}

const defaultState = {
  columns: [],
  data: {
    items: [],
    limit: 10,
    page: 1,
    total: 0,
  },
  filters: [],
  handleSelectAll: () => {},
  order: 'desc' as Order,
  orderBy: 'id',
  page: 1,
  search: {},

  selectedRows: [],
  setOrder: () => {},
  setOrderBy: () => {},
  setPage: () => {},
  setSearch: () => {},
  setSelectedRows: () => {},
}

export const DataGridContext = createContext<DataGridContextState<LEGAL_ANY>>(defaultState)
