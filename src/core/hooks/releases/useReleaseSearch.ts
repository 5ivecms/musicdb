/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useSnackbar } from 'notistack'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import { ReleaseService } from '../../services/release.service'
import type { Order, Search } from '../../types'
import { useDebounce } from '../useDebounce'

export const useReleaseSearch = () => {
  const [page, setPage] = useState<number>(1)
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<string>('id')
  const [search, setSearch] = useState<Search>({})
  const debouncedSearch = useDebounce<Search>(search, 500)
  const { enqueueSnackbar } = useSnackbar()

  const queryData = useQuery(
    ['releases search result', page, order, orderBy, debouncedSearch],
    () => ReleaseService.search({ order, orderBy, page, search: debouncedSearch }),
    {
      onError: (error) => {
        console.error(error)
        enqueueSnackbar('Ошибка при получении списка релизов', {
          variant: 'error',
        })
      },
      select: ({ data }) => data,
    }
  )

  return useMemo(
    () => ({
      ...queryData,
      order,
      orderBy,
      page,
      search,
      setOrder,
      setOrderBy,
      setPage,
      setSearch,
    }),
    [queryData, page, setPage, order, setOrder, orderBy, setOrderBy, search, setSearch]
  )
}
