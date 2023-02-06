import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import type { FC } from 'react'
import { Link } from 'react-router-dom'

import { headerMenu } from './header.data'

const Header: FC = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'start' }} disableGutters>
          {/* <AdbIcon sx={{ display: 'flex', mr: 1 }} /> */}
          <Typography
            component="a"
            href="/"
            sx={{
              color: 'inherit',
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              mr: 2,
              textDecoration: 'none',
            }}
            variant="h6"
            noWrap
          >
            5ivelab.Music
          </Typography>
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            {headerMenu.map((item) => (
              <Button key={item.url} component={Link} sx={{ color: 'white', display: 'block', my: 2 }} to={item.url}>
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
