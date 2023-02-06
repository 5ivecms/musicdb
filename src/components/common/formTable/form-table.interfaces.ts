/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from 'react'

export interface FormTableColumn {
  disabled?: boolean
  field: string
  headerName?: string
  numeric?: boolean
  render?: (data: any) => ReactNode
  required?: boolean
  width?: string
}

export interface FormTableProps {
  addRowProps?: (row: any) => any
  columns: any[]
  loading: boolean
  onSubmit: <T>(data: T) => void
  rows: any[]
}
