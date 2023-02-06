/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useCallback, useMemo } from 'react'
import type { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import type { TrackModel } from '../../models'
import { TrackService } from '../../services'
import { getKeys } from '../../utils'

export const useTrackEdit = (setValue: UseFormSetValue<TrackModel>) => {
  const params = useParams()
  const trackId = String(params.trackId)

  const { isLoading } = useQuery([`edit track ${trackId}`, trackId], () => TrackService.findOne(Number(trackId)), {
    enabled: !!params.trackId,
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

  const onSubmit: SubmitHandler<TrackModel> = useCallback(async (data: TrackModel) => {
    console.log(data)
    // await mutateAsync(data)
  }, [])

  return useMemo(() => ({ isLoading, onSubmit }), [isLoading, onSubmit])
}
