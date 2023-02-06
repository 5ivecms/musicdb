import { Box, Button, FormControl, Grid, Paper, TextField, Typography } from '@mui/material'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'

import { PageHeader, PageTitle } from '../../../components/ui'
import { useGenreEdit } from '../../../core/hooks'
import type { GenreModel } from '../../../core/models'
import { MainLayout } from '../../../layouts'

const GenreEditPage: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<GenreModel>({ mode: 'onChange' })

  const { onSubmit, isLoading } = useGenreEdit(setValue)

  return (
    <MainLayout>
      <PageHeader left={<PageTitle title="Редактировать жанр" />} showBackButton />
      {!isLoading && (
        <Grid spacing={2} container>
          <Grid xs={6} item>
            <Paper sx={{ p: 2 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Typography marginBottom={2} variant="h6">
                  Основное
                </Typography>

                <Grid spacing={2} container>
                  <Grid xs={6} item>
                    <FormControl sx={{ mb: 2 }} fullWidth>
                      <TextField
                        label="Id"
                        variant="outlined"
                        {...register('id', { required: 'Поле не может быть пустым' })}
                        error={Boolean(errors.id?.message)}
                        helperText={String(errors?.id?.message)}
                        disabled
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={6} item>
                    <FormControl sx={{ mb: 2 }} fullWidth>
                      <TextField
                        label="Slug"
                        variant="outlined"
                        {...register('slug', { required: 'Поле не может быть пустым' })}
                        error={Boolean(errors.slug?.message)}
                        helperText={errors?.slug?.message}
                      />
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid spacing={2} container>
                  <Grid xs={6} item>
                    <FormControl sx={{ mb: 2 }} fullWidth>
                      <TextField
                        label="Название"
                        variant="outlined"
                        {...register('name', { required: 'Поле не может быть пустым' })}
                        error={Boolean(errors.name?.message)}
                        helperText={errors?.name?.message}
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={6} item>
                    <FormControl sx={{ mb: 2 }} fullWidth>
                      <TextField label="Краткое название" variant="outlined" {...register('shortName')} />
                    </FormControl>
                  </Grid>
                </Grid>

                <FormControl sx={{ mb: 2 }} fullWidth>
                  <TextField label="Родительский жанр" variant="outlined" {...register('parentId')} />
                </FormControl>

                <Typography marginBottom={2} variant="h6">
                  Источник
                </Typography>
                <Grid spacing={2} container>
                  <Grid xs={6} item>
                    <FormControl sx={{ mb: 2 }} fullWidth>
                      <TextField label="Source Id" variant="outlined" {...register('sourceId')} disabled />
                    </FormControl>
                  </Grid>
                  <Grid xs={6} item>
                    <FormControl sx={{ mb: 2 }} fullWidth>
                      <TextField label="Parent Source Id" variant="outlined" {...register('parentSourceId')} disabled />
                    </FormControl>
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button type="submit" variant="contained">
                    Сохранить
                  </Button>
                </Box>
              </form>
            </Paper>
          </Grid>
        </Grid>
      )}
    </MainLayout>
  )
}

export default GenreEditPage
