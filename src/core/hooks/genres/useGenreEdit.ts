import { useCallback, useMemo } from 'react'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { GenreModel } from '../../models'
import { GenreService } from '../../services/genre.service'
import { getKeys } from '../../utils'

export const useGenreEdit = (setValue: UseFormSetValue<GenreModel>) => {
  const params = useParams()
  const genreId = String(params.genreId)

  const { isLoading } = useQuery([`edit genre ${genreId}`, genreId], () => GenreService.findOne(Number(genreId)), {
    onSuccess: ({ data }) => {
      getKeys(data).forEach((key) => {
        setValue(key, data[key])
      })
    },
    onError: (error) => {
      console.log(JSON.stringify(error))
    },
    keepPreviousData: false,
    enabled: !!params.genreId,
  })

  const { mutateAsync } = useMutation('update genre', (data: any) => GenreService.update(Number(genreId), data), {
    onError: (error) => {},
    onSuccess: () => {
      console.log('жанр обновлен')
    },
  })

  const onSubmit: SubmitHandler<GenreModel> = useCallback(async (data: GenreModel) => {
    console.log(data)
    //await mutateAsync(data)
  }, [])

  return useMemo(
    () => ({
      onSubmit,
      isLoading,
    }),
    [onSubmit, isLoading]
  )
}
