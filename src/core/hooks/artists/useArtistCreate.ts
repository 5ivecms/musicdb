/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSnackbar } from 'notistack'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { artistsBrowseRoutes } from '../../config'
import { ZvukService } from '../../services'
import type { CreateArtistFields } from '../../types/artist'

export const useArtistCreate = (): any => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const { isLoading, mutateAsync } = useMutation(
    'create artist',
    (artistId: number) => ZvukService.parseArtist(artistId),
    {
      onError: (error) => {
        console.error(error)
        enqueueSnackbar('Ошибка при создании исполнителя', {
          variant: 'error',
        })
      },
      onSuccess: ({ data }) => {
        enqueueSnackbar('Исполнитель успешно добавлен', {
          variant: 'success',
        })
        navigate(artistsBrowseRoutes.view(data.id))
      },
    }
  )

  const onSubmit = async (data: CreateArtistFields): Promise<void> => {
    const { zvukUrl } = data
    const urlParts = zvukUrl.split('/')
    const artistId = urlParts[urlParts.length - 1]
    await mutateAsync(Number(artistId))
  }

  return { isLoading, onSubmit }
}
