import type { ReactElement } from 'react'

import DataGirdContainer from './components/DataGirdContainer'
import DataGridProvider from './DataGridProvider'
import type { BaseItem, DataGridProps } from './types'

export const DataGrid = <T extends BaseItem = BaseItem>(props: DataGridProps<T>): ReactElement => {
  return (
    <DataGridProvider {...props}>
      <DataGirdContainer />
    </DataGridProvider>
  )
}
