import { useMemo } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { genresBrowseRoutes } from '../../config'
import { CreateManyGenresDto } from '../../models'
import { GenreService } from '../../services/genre.service'

export const useGenresCreate = () => {
  const navigate = useNavigate()
  const { mutateAsync: createManyGenresAsync, isLoading: isLoadingCreateMany } = useMutation(
    'create many genres',
    (data: CreateManyGenresDto) => GenreService.createMany(data),
    {
      onError: (error) => {
        console.log(JSON.stringify(error))
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
