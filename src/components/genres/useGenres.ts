import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { GenreService } from '../../core/services/genre.service'

export const useGenres = () => {
  const [page, setPage] = useState<number>(1)

  const queryData = useQuery(['genre list', page], () => GenreService.findAll({ page }), {
    select: ({ data }) => data,
    onError: (error) => {
      console.log(JSON.stringify(error))
    },
    keepPreviousData: true,
  })

  return useMemo(
    () => ({
      page,
      setPage,
      ...queryData,
    }),
    [page, setPage, queryData]
  )
}
