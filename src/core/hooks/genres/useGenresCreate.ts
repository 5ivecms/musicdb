/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { genresBrowseRoutes } from '../../config'
import type { CreateManyGenresDto } from '../../models'
import { GenreService } from '../../services/genre.service'

export const useGenresCreate = (): any => {
  const navigate = useNavigate()

  const { mutateAsync: createManyGenresAsync, isLoading: isLoadingCreateMany } = useMutation(
    'create many genres',
    (data: CreateManyGenresDto) => GenreService.createMany(data),
    {
      onError: (error) => {
        console.error(error)
      },
      onSuccess: () => {
        navigate(genresBrowseRoutes.index())
      },
    }
  )

  return useMemo(
    () => ({
      createManyGenresAsync,
      isLoadingCreateMany,
    }),
    [createManyGenresAsync, isLoadingCreateMany]
  )
}
