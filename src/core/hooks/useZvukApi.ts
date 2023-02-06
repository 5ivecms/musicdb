/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { zvukDataBrowseRoutes } from '../config'
import { ZvukService } from '../services/zvuk.service'

export const useZvukApi = () => {
  const navigate = useNavigate()
  const [genres, setGenres] = useState<any>([])

  const { mutateAsync: getGenres, isLoading } = useMutation('get genres', () => ZvukService.getGenres(), {
    onError: (error) => {
      console.error(JSON.stringify(error))
    },
    onSuccess: ({ data }) => {
      setGenres(data.result.genres)
    },
  })

  const { mutateAsync: parseSitemaps, isLoading: parseSitemapsIsLoading } = useMutation(
    'parse zvuk sitemaps',
    (type: string) => ZvukService.parseSitemaps(type),
    {
      onError: (error) => {
        console.error(JSON.stringify(error))
      },
      onSuccess: () => {
        navigate(zvukDataBrowseRoutes.sitemaps())
      },
    }
  )

  return useMemo(
    () => ({ genres, getGenres, isLoading, parseSitemaps, parseSitemapsIsLoading }),
    [genres, getGenres, isLoading, parseSitemaps, parseSitemapsIsLoading]
  )
}
