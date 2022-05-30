import { Box, Button, FormControl, Grid, Paper, TextField, Typography } from '@mui/material'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { PageHeader, PageTitle } from '../../../components/ui'
import { useGenreEdit } from '../../../core/hooks'
import { GenreModel } from '../../../core/models'
import { MainLayout } from '../../../layouts'

const GenreEditPage: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<GenreModel>({ mode: 'onChange' })

  const { onSubmit, isLoading } = useGenreEdit(setValue)

  console.log(errors)

  return (
    <MainLayout>
      <PageHeader left={<PageTitle title="Редактировать жанр" />} showBackButton />
      {!isLoading && (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper sx={{ p: 2 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h6" marginBottom={2}>
                  Основное
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
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
                  <Grid item xs={6}>
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

                <Grid container spacing={2}>
                  <Grid item xs={6}>
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
                  <Grid item xs={6}>
                    <FormControl sx={{ mb: 2 }} fullWidth>
                      <TextField label="Краткое название" variant="outlined" {...register('shortName')} />
                    </FormControl>
                  </Grid>
                </Grid>

                <FormControl sx={{ mb: 2 }} fullWidth>
                  <TextField label="Родительский жанр" variant="outlined" {...register('parentId')} />
                </FormControl>

                <Typography variant="h6" marginBottom={2}>
                  Источник
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl sx={{ mb: 2 }} fullWidth>
                      <TextField label="Source Id" variant="outlined" {...register('sourceId')} disabled />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl sx={{ mb: 2 }} fullWidth>
                      <TextField label="Parent Source Id" variant="outlined" {...register('parentSourceId')} disabled />
                    </FormControl>
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="contained" type="submit">
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
