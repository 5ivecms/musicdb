import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { GenreService } from '../../services/genre.service'

interface UseGenreProps {
  genreId: number
}

export const useGenre = ({ genreId }: UseGenreProps) => {
  const queryData = useQuery([`find one genre`, genreId], () => GenreService.findOne(genreId), {
    select: ({ data }) => {
      return data
    },
    onError: (error) => {
      console.log(JSON.stringify(error))
    },
  })

  return useMemo(
    () => ({
      ...queryData,
    }),
    [queryData]
  )
}
