import { FormControl, Grid, Paper, TextField } from '@mui/material'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'

import { PageHeader, PageTitle } from '../../../components/ui'
import { useTrackEdit } from '../../../core/hooks/tracks'
import type { TrackModel } from '../../../core/models'
import { MainLayout } from '../../../layouts'

const TrackEditPage: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<TrackModel>({ mode: 'onChange' })

  const { onSubmit, isLoading } = useTrackEdit(setValue)

  return (
    <MainLayout>
      {!isLoading && (
        <>
          <PageHeader left={<PageTitle title={`${getValues('credits')}`} />} showBackButton />
          <Grid spacing={2} container>
            <Grid xs={6} item>
              <Paper sx={{ p: 2 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl sx={{ mb: 2 }} fullWidth>
                    <TextField
                      label="Исполнители"
                      variant="outlined"
                      {...register('credits', { required: 'Поле не может быть пустым' })}
                      error={Boolean(errors?.credits?.message)}
                      helperText={Boolean(errors?.credits?.message) && String(errors?.credits?.message)}
                    />
                  </FormControl>

                  <FormControl sx={{ mb: 2 }} fullWidth>
                    <TextField
                      label="Название"
                      variant="outlined"
                      {...register('title', { required: 'Поле не может быть пустым' })}
                      error={Boolean(errors?.title?.message)}
                      helperText={Boolean(errors?.title?.message) && String(errors?.title?.message)}
                    />
                  </FormControl>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </MainLayout>
  )
}

export default TrackEditPage
