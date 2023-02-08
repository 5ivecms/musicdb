import { useSnackbar } from 'notistack'
import { useMemo, useState } from 'react'
import type { UseQueryResult } from 'react-query'
import { useQuery } from 'react-query'

import type { SearchOptions } from '../../../components/common/DataGrid/types'
import type { TrackModel } from '../../models'
import { TrackService } from '../../services'
import type { FindAllResponse, Order, Search } from '../../types'
import { useDebounce } from '../useDebounce'

type UseTrackSearch = SearchOptions & UseQueryResult<FindAllResponse<TrackModel>>

export const useTrackSearch = (relations?: object): UseTrackSearch => {
  const [page, setPage] = useState<number>(1)
  const [order, setOrder] = useState<Order>('desc')
  const [orderBy, setOrderBy] = useState<string>('id')
  const [search, setSearch] = useState<Search>({})
  const debouncedSearch = useDebounce<Search>(search, 500)
  const { enqueueSnackbar } = useSnackbar()

  const queryData = useQuery(
    ['tracks search list', page, order, orderBy, debouncedSearch, relations],
    () => TrackService.search({ order, orderBy, page, relations, search: debouncedSearch }),
    {
      keepPreviousData: true,
      onError: () => {
        enqueueSnackbar('Ошибка при получении списка треков', {
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
