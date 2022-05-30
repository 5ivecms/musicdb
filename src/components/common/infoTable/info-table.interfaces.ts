import { ReactNode } from 'react'

export interface InfoTableColumn {
  field: string
  headerName: string
  width?: string
  render?: (data: any) => ReactNode
}
