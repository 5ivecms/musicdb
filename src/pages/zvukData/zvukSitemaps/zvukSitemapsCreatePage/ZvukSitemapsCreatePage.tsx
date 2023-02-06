/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, FormControl, Grid, MenuItem, Paper, TextField } from '@mui/material'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'

import { PageHeader, PageTitle } from '../../../../components/ui'
import { useZvukApi } from '../../../../core/hooks/useZvukApi'
import { MainLayout } from '../../../../layouts'

const types = [
  {
    label: 'Треки',
    value: 'track',
  },
  {
    label: 'Исполнители',
    value: 'artist',
  },
  {
    label: 'Релизы',
    value: 'release',
  },
]

const ZvukSitemapsCreatePage: FC = () => {
  const { parseSitemaps, parseSitemapsIsLoading } = useZvukApi()
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm()

  const onSubmit = async ({ type }: any): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await parseSitemaps(type)
  }

  return (
    <MainLayout>
      <PageHeader left={<PageTitle title="Zvuk / Добавить карты сайта" />} showBackButton />
      <Grid spacing={2} container>
        <Grid xs={6} item>
          <Paper sx={{ p: 2 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl sx={{ mb: 2 }} fullWidth>
                <TextField
                  defaultValue=""
                  disabled={parseSitemapsIsLoading}
                  error={Boolean(errors.type)}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                  helperText={String(errors?.type?.message || '')}
                  inputProps={register('type', {
                    required: 'Выберите тип',
                  })}
                  label="Тип"
                  fullWidth
                  select
                >
                  {types.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
              <FormControl>
                <Button disabled={parseSitemapsIsLoading} type="submit" variant="contained">
                  Добавить
                </Button>
              </FormControl>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default ZvukSitemapsCreatePage
