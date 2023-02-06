/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useCallback, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'

import { ZvukSitemapsService } from '../services/zvuk-sitemaps.service'
import type { Order } from '../types'
import { useDebounce } from './useDebounce'

export const useZvukSitemaps = () => {
  const [page, setPage] = useState<number>(1)
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<string>('id')
  const [search, setSearch] = useState<Record<string, string>>({})
  const debouncedSearch = useDebounce(search, 500)

  const queryData = useQuery(
    ['zvuk sitemaps list', page, order, orderBy, debouncedSearch],
    () => ZvukSitemapsService.findAll({ order, orderBy, page, search: debouncedSearch }),
    {
      keepPreviousData: true,
      onError: (error) => {
        console.error(error)
      },
      select: ({ data }) => data,
    }
  )

  const { mutateAsync: deleteSitemap } = useMutation(
    'delete zvuk sitemap',
    (id: number | string) => ZvukSitemapsService.delete(id),
    {
      onError: (error) => {
        console.error(error)
      },
      onSuccess: () => {
        queryData.refetch()
      },
    }
  )

  const { mutateAsync: deleteAll } = useMutation('delete all zvuk sitemaps', () => ZvukSitemapsService.deleteAll(), {
    onError: (error) => {
      console.error(error)
    },
    onSuccess: () => {
      queryData.refetch()
    },
  })

  const { mutateAsync: sitemapsInfoAsync } = useMutation('zvuk sitemaps status', () => ZvukSitemapsService.info(), {
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
      deleteSitemap,
      order,
      orderBy,
      page,
      refresh,
      search,
      setOrder,
      setOrderBy,
      setPage,
      setSearch,
      sitemapsInfoAsync,
      ...queryData,
    }),
    [
      queryData,
      page,
      setPage,
      order,
      setOrder,
      orderBy,
      setOrderBy,
      search,
      setSearch,
      refresh,
      deleteSitemap,
      deleteAll,
      sitemapsInfoAsync,
    ]
  )
}
