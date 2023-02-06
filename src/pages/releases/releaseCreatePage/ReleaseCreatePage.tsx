import { Button } from '@mui/material'
import type { FC } from 'react'

import { PageHeader, PageTitle } from '../../../components/ui'
import { MainLayout } from '../../../layouts'

const ReleaseCreatePage: FC = () => {
  return (
    <MainLayout>
      <PageHeader
        left={<PageTitle title="Добавить релизы" />}
        right={<Button variant="contained">Получить</Button>}
        showBackButton
      />
    </MainLayout>
  )
}

export default ReleaseCreatePage
