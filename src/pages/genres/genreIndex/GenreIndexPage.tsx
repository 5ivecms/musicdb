import { FC } from 'react'
import MainLayout from '../../../layouts/MainLayout'
import { GenresTable } from '../../../components/genres'

const GenreIndexPage: FC = () => {
  return (
    <MainLayout>
      <div style={{ marginTop: '30px' }}>
        <GenresTable />
      </div>
    </MainLayout>
  )
}

export default GenreIndexPage
