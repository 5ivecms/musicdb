import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import type { FC } from 'react'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'

import { DataGrid } from '../../../components/common/DataGrid'
import type { DataGridFilterDef } from '../../../components/common/DataGrid/types'
import { getRelations } from '../../../components/common/DataGrid/utils'
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      return row.original.artists.map((artist: ArtistModel) => (
        <div key={`${row.original.id}${artist.id}`}>{artist.title}</div>
      ))
    },
    header: () => 'Исполнители',
  }),
]

const filters: DataGridFilterDef<TrackModel>[] = [
  { name: 'id', placeholder: 'id', type: 'text' },
  { name: 'title', placeholder: 'Название', type: 'text' },
  { name: 'credits', placeholder: 'Исполнитель', type: 'text' },
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
]

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
