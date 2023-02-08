/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { useCallback, useMemo } from 'react'
import type { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import type { GenreModel } from '../../models'
import { GenreService } from '../../services/genre.service'
import { getKeys } from '../../utils'

type UseGenreEdit = {
  isLoading: boolean
  onSubmit: SubmitHandler<GenreModel>
}

export const useGenreEdit = (setValue: UseFormSetValue<GenreModel>): UseGenreEdit => {
  const params = useParams()
  const genreId = String(params.genreId)

  const { isLoading } = useQuery([`edit genre ${genreId}`, genreId], () => GenreService.findOne(Number(genreId)), {
    enabled: !!params.genreId,
    keepPreviousData: false,
    onError: (error) => {
      console.error(error)
    },
    onSuccess: ({ data }) => {
      getKeys(data).forEach((key) => {
        setValue(key, data[key])
      })
    },
  })

  const onSubmit: SubmitHandler<GenreModel> = useCallback((data: GenreModel) => {
    console.log(data)
  }, [])

  return useMemo(() => ({ isLoading, onSubmit }), [onSubmit, isLoading])
}
