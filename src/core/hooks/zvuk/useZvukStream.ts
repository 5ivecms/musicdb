/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMemo } from 'react'
import { useMutation } from 'react-query'

import { ZvukService } from '../../services'

export const useZvukStream = () => {
  const zvukStreamUrl = useMutation('zvuk stream url', (id: number) => ZvukService.getStreamUrl(id), {
    onError: (error) => {
      console.error(error)
    },
  })

  return useMemo(() => ({ zvukStreamUrl }), [zvukStreamUrl])
}
