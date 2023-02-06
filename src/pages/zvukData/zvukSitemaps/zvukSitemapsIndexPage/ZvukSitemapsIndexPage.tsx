import { Add, Delete } from '@mui/icons-material'
import type { SxProps } from '@mui/material'
import { Button } from '@mui/material'
import type { FC } from 'react'
import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

import { CustomDialog, PageHeader, PageTitle } from '../../../../components/ui'
import SitemapsDataTable from '../../../../components/zvukData/sitemapsDataTable/SitemapsDataTable'
import { zvukDataBrowseRoutes } from '../../../../core/config'
import { useZvukSitemaps } from '../../../../core/hooks/useZvukSitemaps'
import { MainLayout } from '../../../../layouts'

const buttonMarginSx: SxProps = {
  mr: 1,
}

const ZvukSitemapsIndexPage: FC = () => {
  const { deleteAll } = useZvukSitemaps()
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
        left={<PageTitle title="Zvuk / Карты сайта" />}
        right={
          <>
            <Button
              color="error"
              endIcon={<Delete />}
              onClick={toggleDeleteAllDialog}
              sx={buttonMarginSx}
              variant="contained"
            >
              Удалить все
            </Button>
            <Button component={Link} endIcon={<Add />} to={zvukDataBrowseRoutes.sitemapsCreate()} variant="contained">
              Добавить
            </Button>
          </>
        }
      />

      <SitemapsDataTable />

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

export default ZvukSitemapsIndexPage
