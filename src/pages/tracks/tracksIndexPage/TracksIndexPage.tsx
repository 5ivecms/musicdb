/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import * as dot from 'dot-object'
import type { FC } from 'react'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'

import { DataGrid } from '../../../components/common/DataGrid'
import type { DataGridFilterDef } from '../../../components/common/DataGrid/types'
import { PageHeader, PageTitle } from '../../../components/ui'
import { tracksBrowseRoutes } from '../../../core/config'
import { useTrackSearch } from '../../../core/hooks/tracks'
import type { ArtistModel, TrackModel } from '../../../core/models'
import { ArtistService } from '../../../core/services/artist.service'
import { MainLayout } from '../../../layouts'

const columnHelper = createColumnHelper<TrackModel>()

const columns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    header: () => 'ID',
    minSize: 200,
    size: 200,
  }),
  columnHelper.accessor('title', {
    cell: (info) => info.getValue(),
    header: () => 'Название',
    size: 1000,
  }),
  columnHelper.accessor('credits', {
    cell: (info) => info.getValue(),
    header: () => 'Исполнители',
    minSize: 300,
    size: 100,
  }),
  columnHelper.accessor('artists.id', {
    cell: ({ row }) => {
      return row.original.artists.map((artist: ArtistModel) => (
        <div key={`${row.original.id}${artist.id}`}>{artist.title}</div>
      ))
    },
    header: () => 'Исполнители',
  }),
  /* columnHelper.accessor('artists.id', {
    cell: ({ row }) => {
      return row.original.artists.map((artist: ArtistModel) => (
        <div key={`${row.original.id}${artist.id}`}>{artist.title}</div>
      ))
    },
    header: () => 'Исполнители',
    minSize: 300,
    size: 100,
  }), */
]

const filters: DataGridFilterDef<TrackModel>[] = [
  { name: 'id', placeholder: 'id', type: 'text' },
  { name: 'title', placeholder: 'Название', type: 'text' },
  { name: 'credits', placeholder: 'Исполнитель', type: 'text' },
  /* {
    name: 'artists.id',
    options: [
      { label: 'Все исполнители', value: '' },
      { label: 'Исполнитель 1', value: '1' },
      { label: 'Исполнитель 2', value: '2' },
    ],
    placeholder: 'Исполнитель',
    type: 'select',
  }, */
  {
    asyncSelectOptions: {
      loadOptions: async (term) => {
        const { data } = await ArtistService.search(term.length > 0 ? { search: { title: term } } : {})
        return data?.items.map(({ id, title }) => ({ label: title, value: String(id) }))
      },
    },
    name: 'artists.id',
    placeholder: 'Исполнитель',
    type: 'asyncSelect',
  },
  /* {
    name: 'release.genres.id',
    placeholder: 'Жанр',
    type: 'text'
  } */
]

// TODO: перенести поулчение связей в хук поиска. Связи можно получить из текущих фильтров
const getRelations = (filtersParams: DataGridFilterDef<TrackModel>[]): object => {
  const relations = filtersParams.reduce((acc, item) => {
    const fieldParts = item.name.split('.')
    if (fieldParts.length === 1) {
      return acc
    }

    fieldParts.pop()
    const relation = fieldParts.join('.')

    return { ...acc, [relation]: true }
  }, {})
  return dot.object(relations)
}

const TracksIndexPage: FC = () => {
  const handleDelete = useCallback((id: number) => {
    console.log(id)
  }, [])

  const handleDeleteMany = useCallback((ids: string) => {
    console.log(ids)
  }, [])

  return (
    <MainLayout>
      <PageHeader
        left={<PageTitle title="Список треков" />}
        right={
          <Button component={Link} endIcon={<Add />} to={tracksBrowseRoutes.create()} variant="contained">
            Добавить
          </Button>
        }
      />

      <DataGrid columns={columns} filters={filters} {...useTrackSearch(getRelations(filters))} />
    </MainLayout>
  )
}

export default TracksIndexPage
