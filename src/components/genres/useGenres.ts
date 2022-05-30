import { useMutation, useQuery } from 'react-query'
import { useCallback, useMemo, useState } from 'react'
import { useDebounce } from '../../core/hooks'
import { GenreService } from '../../core/services/genre.service'
import { Order } from '../common/dataTable/data-table.interfaces'

export const useGenres = () => {
  const [page, setPage] = useState<number>(1)
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<string>('id')
  const [search, setSearch] = useState<{ [key: string]: string }>({})
  const debouncedSearch = useDebounce(search, 500)

  const queryData = useQuery(
    ['genre list', page, order, orderBy, debouncedSearch],
    () => GenreService.findAll({ page, order, orderBy, search: debouncedSearch }),
    {
      select: ({ data }) => data,
      onError: (error) => {
        console.log(JSON.stringify(error))
      },
      keepPreviousData: true,
    }
  )

  const { mutateAsync: deleteGenre } = useMutation('delete genre', (id: string | number) => GenreService.delete(id), {
    onError: (error) => {
      console.log(JSON.stringify(error))
    },
    onSuccess: () => {
      console.log(`Жанр удален`)
      queryData.refetch()
    },
  })

  const { mutateAsync: deleteGenres } = useMutation(
    'delete many genres',
    (ids: string) => GenreService.deleteMany(ids),
    {
      onError: (error) => {
        console.log(JSON.stringify(error))
      },
      onSuccess: () => {
        console.log('жанры удалены')
        queryData.refetch()
      },
    }
  )

  const refresh = useCallback(() => {
    queryData.refetch()
  }, [queryData])

  return useMemo(
    () => ({
      page,
      setPage,
      order,
      setOrder,
      orderBy,
      setOrderBy,
      search,
      setSearch,
      deleteGenre,
      deleteGenres,
      refresh,
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
