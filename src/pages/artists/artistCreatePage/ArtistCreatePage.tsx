import { Box, Button, CircularProgress, Grid, TextField } from '@mui/material'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'

import { PageHeader, PageTitle } from '../../../components/ui'
import { useArtistCreate } from '../../../core/hooks/artists'
import type { CreateArtistFields } from '../../../core/types/artist'
import { MainLayout } from '../../../layouts'

const ArtistCreatePage: FC = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<CreateArtistFields>()

  const { onSubmit, isLoading } = useArtistCreate()

  return (
    <MainLayout>
      <PageHeader left={<PageTitle title="Добавить исполнителя" />} showBackButton />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid spacing={2} sx={{ marginBottom: 3 }} container>
          <Grid xs={11} item>
            <TextField
              {...register('zvukUrl', { required: 'URL не может быть пустым' })}
              error={Boolean(errors?.zvukUrl?.message)}
              helperText={errors?.zvukUrl?.message}
              label="Url на страницу исполнителя zvuk.com"
              placeholder="Например: https://zvuk.com/artist/99662297"
              size="small"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid xs={1} item>
            <Button type="submit" variant="contained" fullWidth>
              Добавить
            </Button>
          </Grid>
        </Grid>
      </form>

      {isLoading && (
        <Box sx={{ display: isLoading ? 'none' : 'flex', justifyContent: 'center', my: 3 }}>
          <CircularProgress size={40} thickness={4} value={100} />
        </Box>
      )}
    </MainLayout>
  )
}

export default ArtistCreatePage
