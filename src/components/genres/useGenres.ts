/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useCallback, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'

import { useDebounce } from '../../core/hooks'
import { GenreService } from '../../core/services/genre.service'
import type { Order } from '../../core/types'

export const useGenres = () => {
  const [page, setPage] = useState<number>(1)
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<string>('id')
  const [search, setSearch] = useState<Record<string, string>>({})
  const debouncedSearch = useDebounce(search, 500)

  const queryData = useQuery(
    ['genre list', page, order, orderBy, debouncedSearch],
    () => GenreService.findAll({ order, orderBy, page, search: debouncedSearch }),
    {
      keepPreviousData: true,
      onError: (error) => {
        console.error(error)
      },
      select: ({ data }) => data,
    }
  )

  const { mutateAsync: deleteGenre } = useMutation('delete genre', (id: number | string) => GenreService.delete(id), {
    onError: (error) => {
      console.error(error)
    },
    onSuccess: () => {
      queryData.refetch()
    },
  })

  const { mutateAsync: deleteGenres } = useMutation(
    'delete many genres',
    (ids: string) => GenreService.deleteMany(ids),
    {
      onError: (error) => {
        console.error(error)
      },
      onSuccess: () => {
        queryData.refetch()
      },
    }
  )

  const refresh = useCallback(() => {
    queryData.refetch()
  }, [queryData])

  return useMemo(
    () => ({
      deleteGenre,
      deleteGenres,
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
      queryData,
      order,
      orderBy,
      setOrder,
      setOrderBy,
      search,
      setSearch,
      deleteGenre,
      deleteGenres,
      refresh,
    ]
  )
}
