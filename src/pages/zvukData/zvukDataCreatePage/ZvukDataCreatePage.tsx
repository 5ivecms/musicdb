import { Button, Grid } from '@mui/material'
import type { FC } from 'react'

import { PageHeader, PageTitle } from '../../../components/ui'
import { SitemapsInfoTable } from '../../../components/zvukData'
import { useParseZvukSongIds } from '../../../core/hooks/useParseZvukSongIds'
import { MainLayout } from '../../../layouts'

const ZvukDataCreatePage: FC = () => {
  const { isParsing, startParsing, stopParsing, sitemapsInfo } = useParseZvukSongIds()

  return (
    <MainLayout>
      <PageHeader
        left={<PageTitle title="Добавить данные" />}
        right={
          <Button
            color={isParsing ? 'error' : 'success'}
            onClick={isParsing ? stopParsing : startParsing}
            variant="contained"
          >
            {isParsing ? 'Остановить парсинг' : 'Запустить парсинг'}
          </Button>
        }
        showBackButton
      />

      <Grid spacing={2} container>
        <Grid xs={4} item>
          <SitemapsInfoTable status={sitemapsInfo} />
        </Grid>
        <Grid xs={8} item />
      </Grid>
    </MainLayout>
  )
}

export default ZvukDataCreatePage
