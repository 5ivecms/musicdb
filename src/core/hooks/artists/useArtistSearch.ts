import { useSnackbar } from 'notistack'
import { useMemo, useState } from 'react'
import type { UseQueryResult } from 'react-query'
import { useQuery } from 'react-query'

import type { SearchOptions } from '../../../components/common/DataGrid/types'
import type { ArtistModel } from '../../models'
import { ArtistService } from '../../services/artist.service'
import type { FindAllResponse, Order, Search } from '../../types'
import { useDebounce } from '../useDebounce'

type UseArtistSearch = SearchOptions & UseQueryResult<FindAllResponse<ArtistModel>>

export const useArtistSearch = (): UseArtistSearch => {
  const [page, setPage] = useState<number>(1)
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<string>('id')
  const [search, setSearch] = useState<Search>({})
  const debouncedSearch = useDebounce<Search>(search, 500)
  const { enqueueSnackbar } = useSnackbar()

  const queryData = useQuery(
    ['releases search result', page, order, orderBy, debouncedSearch],
    () => ArtistService.search({ order, orderBy, page, search: debouncedSearch }),
    {
      keepPreviousData: true,
      onError: () => {
        enqueueSnackbar('Ошибка при получении списка исполнителей', { variant: 'error' })
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
