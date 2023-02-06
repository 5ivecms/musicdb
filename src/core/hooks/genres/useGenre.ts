/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react'
import { useQuery } from 'react-query'

import { GenreService } from '../../services/genre.service'

interface UseGenreProps {
  genreId: number
}

export const useGenre = ({ genreId }: UseGenreProps): any => {
  const queryData = useQuery([`find one genre`, genreId], () => GenreService.findOne(genreId), {
    onError: (error) => {
      console.error(error)
    },
    select: ({ data }) => data,
  })

  return useMemo(() => ({ ...queryData }), [queryData])
}
