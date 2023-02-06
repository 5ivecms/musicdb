/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useCallback, useMemo } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { tracksBrowseRoutes } from '../../config'
import { ZvukService } from '../../services'

export const useParseZvukTracksBySourceIds = () => {
  const navigate = useNavigate()

  const parseTracks = useMutation('parse zvuk tracks', (data: number[]) => ZvukService.parseTracksBySourceIds(data), {
    onError: (error: any) => {
      console.error(error)
    },
  })

  const onSubmit = useCallback(
    async (data: any) => {
      if (data.length === 0) {
        return
      }

      const sourceIds = data.map((item: any) => item.id) as number[]
      await parseTracks.mutateAsync(sourceIds)
      navigate(tracksBrowseRoutes.index())
    },
    [parseTracks, navigate]
  )

  return useMemo(
    () => ({
      onSubmit,
      parseTracks,
    }),
    [parseTracks, onSubmit]
  )
}
