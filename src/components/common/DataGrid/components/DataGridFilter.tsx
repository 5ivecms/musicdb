import { Checkbox, MenuItem, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import type { ChangeEvent, ReactElement } from 'react'
import { useContext, useEffect, useState } from 'react'

import { useDebounce } from '../../../../core/hooks'
import { DEFAULT_LIMIT } from '../data-grid.config'
import type { DataGridContextState } from '../DataGridContext'
import { DataGridContext } from '../DataGridContext'
import { filterCell } from '../styles.sx'
import type { BaseItem, Search } from '../types'
import { filterParams } from '../utils'
import { AsyncAutocomplete } from './AsyncAutocomplete'

const DataGridFilter = <T extends BaseItem>(): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const { setSearch, search, filters, selectedRows, data, handleSelectAll } =
    useContext<DataGridContextState<T>>(DataGridContext)
  const limit = data?.limit || DEFAULT_LIMIT
  const [params, setParams] = useState<Search>({})
  const debouncedParams = useDebounce(params, 500)

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setParams((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    setSearch({ ...search, ...filterParams(debouncedParams) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParams, setSearch])

  return filters !== undefined && filters.length > 0 ? (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            checked={limit > 0 && selectedRows.length === limit}
            color="primary"
            indeterminate={selectedRows.length > 0 && selectedRows.length < limit}
            inputProps={{ 'aria-label': 'select all desserts' }}
            onChange={handleSelectAll}
          />
        </TableCell>
        {filters.map((filter) => {
          return (
            <TableCell key={`filter-${String(filter.name)}`} sx={filterCell}>
              {filter.type === 'text' && (
                <TextField
                  label={String(filter?.placeholder || '')}
                  name={String(filter.name)}
                  onChange={handleSearch}
                  placeholder={filter?.placeholder || ''}
                  size="small"
                  type="text"
                  fullWidth
                />
              )}

              {filter.type === 'select' && filter.options !== undefined && (
                <TextField
                  defaultValue=""
                  label={filter?.placeholder || ''}
                  name={String(filter.name)}
                  onChange={handleSearch}
                  placeholder={filter?.placeholder || ''}
                  size="small"
                  fullWidth
                  select
                >
                  {filter.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}

              {filter.type === 'asyncSelect' && filter.asyncSelectOptions !== undefined && (
                <AsyncAutocomplete
                  loadOptions={filter.asyncSelectOptions.loadOptions}
                  onChange={(value) => setParams((prev) => ({ ...prev, [String(filter?.name)]: value }))}
                  placeholder={filter?.placeholder || ''}
                />
              )}
            </TableCell>
          )
        })}
        <TableCell />
      </TableRow>
    </TableHead>
  ) : (
    <></>
  )
}

export default DataGridFilter
