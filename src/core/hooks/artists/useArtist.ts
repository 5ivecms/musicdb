/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSnackbar } from 'notistack'
import { useMemo } from 'react'
import type { UseQueryResult } from 'react-query'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import type { ArtistModel } from '../../models'
import { ArtistService } from '../../services/artist.service'

type UseArtist = UseQueryResult<ArtistModel>

export const useArtist = (): UseArtist => {
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
