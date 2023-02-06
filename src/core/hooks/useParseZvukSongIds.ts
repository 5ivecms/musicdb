/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-use-before-define */
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'

import { ZvukService } from '../services/zvuk.service'
import type { SitemapsInfo } from '../types'
import { useZvukSitemaps } from './useZvukSitemaps'

const defaultSitemapsInfo = {
  completed: 0,
  new: 0,
  process: 0,
  total: 0,
}

export const useParseZvukSongIds = () => {
  const { sitemapsInfoAsync } = useZvukSitemaps()
  const [isParsing, setIsParsing] = useState<boolean>(false)
  const [sitemapsInfo, setSitemapsInfo] = useState<SitemapsInfo>(defaultSitemapsInfo)

  const getInfo = useCallback(async () => {
    const result = await sitemapsInfoAsync()
    setSitemapsInfo(result.data)
  }, [sitemapsInfoAsync])

  const { mutate: parserSongsIdsAsync } = useMutation('parser songs ids', () => ZvukService.parseSongIds(), {
    onError: (error) => {
      console.error(error)
    },
    onSuccess: async () => {
      if (sitemapsInfo.completed <= sitemapsInfo.total) {
        parsing()
        await getInfo()
      } else {
        stopParsing()
      }
    },
  })

  const startParsing = useCallback(() => {
    setIsParsing(true)
    parserSongsIdsAsync()
  }, [parserSongsIdsAsync])

  const stopParsing = useCallback(() => {
    setIsParsing(false)
  }, [])

  const parsing = (): void => {
    parserSongsIdsAsync()
  }

  useEffect(() => {
    getInfo()
  }, [getInfo])

  return useMemo(
    () => ({ isParsing, sitemapsInfo, startParsing, stopParsing }),
    [isParsing, startParsing, stopParsing, sitemapsInfo]
  )
}
