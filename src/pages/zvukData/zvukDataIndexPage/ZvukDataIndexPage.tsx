import { Add, Delete } from '@mui/icons-material'
import type { SxProps } from '@mui/material'
import { Button } from '@mui/material'
import type { FC } from 'react'
import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

import { CustomDialog, PageHeader, PageTitle } from '../../../components/ui'
import { SongsDataTable } from '../../../components/zvukData'
import { zvukDataBrowseRoutes } from '../../../core/config'
import { useSongsData } from '../../../core/hooks/useSongsData'
import { MainLayout } from '../../../layouts'

const buttonMrSx: SxProps = {
  mr: 1,
}

const ZvukDataIndexPage: FC = () => {
  const { deleteAll, isLoadingDeleteAll } = useSongsData()
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState<boolean>(false)

  const toggleDeleteAllDialog = useCallback(() => {
    setShowDeleteAllDialog((prevState) => !prevState)
  }, [])

  const handleConfirmDeleteAll = useCallback(async () => {
    await deleteAll()
    toggleDeleteAllDialog()
  }, [deleteAll, toggleDeleteAllDialog])

  return (
    <MainLayout>
      <PageHeader
        left={<PageTitle title="Zvuk Data" />}
        right={
          <>
            <Button
              color="error"
              disabled={isLoadingDeleteAll}
              endIcon={<Delete />}
              onClick={toggleDeleteAllDialog}
              sx={buttonMrSx}
              variant="contained"
            >
              Удалить все
            </Button>
            <Button component={Link} endIcon={<Add />} to={zvukDataBrowseRoutes.create()} variant="contained">
              Добавить
            </Button>
          </>
        }
      />
      <SongsDataTable />

      <CustomDialog
        btnAgreeText="Удалить"
        btnCloseText="Отмена"
        description=""
        onClose={toggleDeleteAllDialog}
        onConfirm={handleConfirmDeleteAll}
        open={showDeleteAllDialog}
        title="Точно удалить все?"
      />
    </MainLayout>
  )
}

export default ZvukDataIndexPage
