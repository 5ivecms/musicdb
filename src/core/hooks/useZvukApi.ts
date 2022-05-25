import { useState } from 'react'
import { useMutation } from 'react-query'
import { ZvukService } from '../services/zvuk.service'

export const useZvukApi = () => {
  const [genres, setGenres] = useState<any>([])

  const { mutateAsync: getGenres, isLoading } = useMutation('get genres', () => ZvukService.getGenres(), {
    onError: (error) => {
      console.log(JSON.stringify(error))
    },
    onSuccess: ({ data }) => {
      setGenres(data.result.genres)
    },
  })

  return { genres, getGenres, isLoading }
}
