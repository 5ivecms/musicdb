/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMemo } from 'react'
import { useQuery } from 'react-query'

import { TrackService } from '../../services'

export const useTrack = (trackId: number) => {
  const queryData = useQuery([`find one track ${trackId}`], () => TrackService.findOne(trackId), {
    onError: (error) => {
      console.error(error)
    },
    select: ({ data }) => data,
  })

  return useMemo(() => ({ ...queryData }), [queryData])
}
