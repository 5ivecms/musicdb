/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSnackbar } from 'notistack'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { ArtistService } from '../../services/artist.service'

export const useArtist = (): any => {
  const { enqueueSnackbar } = useSnackbar()
  const params = useParams()
  const artistId = String(params.artistId)

  const queryData = useQuery([`find one track ${artistId}`], () => ArtistService.findOne(Number(artistId)), {
    enabled: !!params.artistId,
    onError: (error) => {
      console.error(error)
      enqueueSnackbar('Ошибка при создании исполнителя', {
        variant: 'error',
      })
    },
    select: ({ data }) => data,
  })

  return useMemo(() => ({ ...queryData }), [queryData])
}
