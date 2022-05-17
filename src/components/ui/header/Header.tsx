import { FC } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import AdbIcon from '@mui/icons-material/Adb'
import { headerMenu } from './header.data'
import { Link } from 'react-router-dom'

const Header: FC = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'start' }}>
          <AdbIcon sx={{ display: 'flex', mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.125rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MusicDB
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            {headerMenu.map((item) => (
              <Button key={item.url} sx={{ my: 2, color: 'white', display: 'block' }} component={Link} to={item.url}>
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
