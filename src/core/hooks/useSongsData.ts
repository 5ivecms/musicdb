/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useCallback, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'

import { SongsDataService } from '../services/songs-data.service'
import type { Order, Search } from '../types'
import { useDebounce } from './useDebounce'

export const useSongsData = () => {
  const [page, setPage] = useState<number>(1)
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<string>('id')
  const [search, setSearch] = useState<Search>({})
  const debouncedSearch = useDebounce(search, 500)

  const queryData = useQuery(
    ['songs data list', page, order, orderBy, debouncedSearch],
    () => SongsDataService.findAll({ order, orderBy, page, search: debouncedSearch }),
    {
      keepPreviousData: true,
      onError: (error) => {
        console.error(error)
      },
      select: ({ data }) => data,
    }
  )

  const { mutateAsync: deleteSongsData } = useMutation(
    'delete song data',
    (id: number | string) => SongsDataService.delete(Number(id)),
    {
      onError: (error) => {
        console.error(error)
      },
      onSuccess: () => {
        queryData.refetch()
      },
    }
  )

  const { mutateAsync: deleteManySongsData, isLoading: isLoadingDeleteAll } = useMutation(
    'delete many songs data',
    (ids: string) => SongsDataService.deleteMany(ids),
    {
      onError: (error) => {
        console.error(error)
      },
      onSuccess: () => {
        queryData.refetch()
      },
    }
  )

  const { mutateAsync: deleteAll } = useMutation('delete all songs data', () => SongsDataService.deleteAll(), {
    onError: (error) => {
      console.error(error)
    },
  })

  const refresh = useCallback(() => {
    queryData.refetch()
  }, [queryData])

  return useMemo(
    () => ({
      deleteAll,
      deleteManySongsData,
      deleteSongsData,
      isLoadingDeleteAll,
      order,
      orderBy,
      page,
      refresh,
      search,
      setOrder,
      setOrderBy,
      setPage,
      setSearch,
      ...queryData,
    }),
    [
      page,
      setPage,
      order,
      setOrder,
      orderBy,
      setOrderBy,
      search,
      setSearch,
      refresh,
      deleteSongsData,
      deleteManySongsData,
      deleteAll,
      isLoadingDeleteAll,
      queryData,
    ]
  )
}
