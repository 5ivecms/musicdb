/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMutation } from 'react-query'

import { ZvukService } from '../../services/zvuk.service'
import type { TrackSearchFields } from '../../types/tracks'

export const useZvukTrackSearch = () => {
  const searchTracks = useMutation('search tracks', (data: TrackSearchFields) => ZvukService.searchTracks(data), {
    onError: (error) => {
      console.error(JSON.stringify(error))
    },
  })

  const onSubmit = async (data: TrackSearchFields) => {
    await searchTracks.mutateAsync(data)
  }

  return { onSubmit, searchTracks }
}
