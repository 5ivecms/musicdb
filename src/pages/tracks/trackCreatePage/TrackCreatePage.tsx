/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-shadow */
import type { SxProps } from '@mui/material'
import { Button, FormControl, Grid, MenuItem, TextField } from '@mui/material'
import { green, red } from '@mui/material/colors'
import type { FC } from 'react'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { FormTable } from '../../../components/common'
import type { FormTableColumn } from '../../../components/common/formTable/form-table.interfaces'
import { PageHeader, PageTitle } from '../../../components/ui'
import { useAudioPlayer } from '../../../core/hooks'
import { useParseZvukTracksBySourceIds, useZvukStream, useZvukTrackSearch } from '../../../core/hooks/zvuk'
import type { TrackSearchFields, ZvukTrack } from '../../../core/types/tracks'
import { prepareImageSrc } from '../../../core/utils/image'
import { MainLayout } from '../../../layouts'

const TrackCreatePage: FC = () => {
  const { setSrc } = useAudioPlayer()
  const { zvukStreamUrl } = useZvukStream()
  const { parseTracks, onSubmit: onSubmitParseTracks } = useParseZvukTracksBySourceIds()

  const {
    onSubmit,
    searchTracks: { data, isLoading },
  } = useZvukTrackSearch()

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<TrackSearchFields>()

  const onPlay = useCallback(
    async (id: number) => {
      const result = await zvukStreamUrl.mutateAsync(id)
      setSrc(result.data)
    },
    [setSrc, zvukStreamUrl]
  )

  const columns: FormTableColumn[] = useMemo(
    () => [
      {
        field: 'image',
        render: (data: ZvukTrack) => {
          return (
            <img
              alt=""
              onClick={() => onPlay(data.id)}
              src={prepareImageSrc(data.image.src, 34)}
              style={{ cursor: 'pointer' }}
            />
          )
        },
        width: '34px',
      },
      { disabled: true, field: 'id', headerName: 'ID', numeric: false, required: true, width: '150px' },
      {
        field: 'credits',
        headerName: 'Исполнитель',
        numeric: false,
        required: true,
      },
      {
        field: 'title',
        headerName: 'Название',
        numeric: false,
        required: true,
      },
    ],
    [onPlay]
  )

  const tracks = data?.data.tracks ?? {}
  const tracksArray = Object.keys(tracks).map((trackId) => tracks[trackId])
  const existTrackIds = data?.data?.existTracks.map(Number) || []

  return (
    <MainLayout>
      <PageHeader left={<PageTitle title="Добавить треки" />} showBackButton />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid spacing={2} sx={{ marginBottom: 3 }} container>
          <Grid xs={7} item>
            <TextField
              {...register('query')}
              error={Boolean(errors?.query?.message)}
              helperText={errors?.query?.message}
              label="Поиск"
              size="small"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid xs={2} item>
            <TextField
              {...register('limit')}
              defaultValue={10}
              error={Boolean(errors?.limit?.message)}
              helperText={errors?.limit?.message}
              inputProps={{ max: 1000, min: 1 }}
              label="Количество"
              size="small"
              type="number"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid xs={2} item>
            <FormControl fullWidth>
              <TextField
                defaultValue="new"
                error={Boolean(errors?.mode?.message)}
                helperText={errors.mode?.message}
                inputProps={register('mode')}
                label="Режим"
                size="small"
                fullWidth
                select
              >
                <MenuItem value="new">Новинки</MenuItem>
                <MenuItem value="popular">Популярные</MenuItem>
                <MenuItem value="query">Запрос</MenuItem>
              </TextField>
            </FormControl>
          </Grid>
          <Grid xs={1} item>
            <Button type="submit" variant="contained" fullWidth>
              Найти
            </Button>
          </Grid>
        </Grid>
      </form>

      {!isLoading && (
        <FormTable
          addRowProps={(row) => {
            const sx: SxProps = existTrackIds.includes(row.id) ? { background: green[100] } : { background: red[100] }
            return { hover: false, sx }
          }}
          columns={columns}
          loading={parseTracks.isLoading}
          onSubmit={onSubmitParseTracks}
          rows={tracksArray}
        />
      )}
    </MainLayout>
  )
}

export default TrackCreatePage
