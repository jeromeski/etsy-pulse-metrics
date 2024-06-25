// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import Typography from '@mui/material/Typography'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { makeStyles } from '@mui/styles'

// ** Next Import
import getConfig from 'next/config'

// ** Icon Imports
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import RobotOutline from 'mdi-material-ui/RobotOutline'

// ** Data Import
import { left } from '@popperjs/core'
import Api from 'src/common/api'
import FloatingChat from './FloatingChat'

const FooterContent = () => {
  const [close, setClose] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false)
  const [openSpeedDial, setOpenSpeedDial] = useState<boolean>(false)
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false)
  const [isRobotOutline, setIsRobotOutline] = useState<boolean>(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRobotOutline(prevIsRobotOutline => !prevIsRobotOutline)
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const { publicRuntimeConfig } = getConfig()
  let appVersion = publicRuntimeConfig.appVersion
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  if (!appVersion) {
    appVersion = '1.0.2'
  }

  const handleOpenSpeedDial = () => {
    setOpenSpeedDial(true)
  }

  const handleToggleSpeedDial = () => {
    setOpenSpeedDial(prev => !prev)
  }

  const handleCloseSpeedDial = () => {
    setOpenSpeedDial(false)
  }

  const handleOpen = () => {
    setClose(false)
    setOpen(true)
  }

  const handleClose = () => {
    setClose(true)
    setOpen(false)
  }

  const handleConfirmVA = async () => {
    console.log('confirm')
    const data = await Api.togglePayment('va-payment')
    window.location.href = data?.redirect_url
  }

  const actions = [
    {
      icon: <img alt='image' src='/images/pngegg-white.png' width='30' />,
      name: 'Hire a Virtual Assistant',
      onClick: handleOpen
    },
    {
      icon: <RobotOutline sx={{ color: 'white', width: '100', height: '100' }} />,
      name: 'AI Chat',
      onClick: () => setIsChatOpen(prev => !prev)
    }
  ]

  const useStyles = makeStyles(theme => ({
    staticTooltipLabel: {
      width: '230px',
      backgroundColor: '#0275d8',
      color: 'white'
    }
  }))

  const classes = useStyles()

  const lgAbove = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
  const mdAbove = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const smAbove = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))
  const xsAbove = useMediaQuery((theme: Theme) => theme.breakpoints.up('xs'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography
        sx={{
          mr: 2,
          width: xsAbove ? '75%' : '100%'
        }}
      >
        {`© ${new Date().getFullYear()}, Made with `}
        <Box component='span' sx={{ color: 'error.main' }}>
          ❤️
        </Box>
        {` by `}
        <Link target='_blank' href='https://cebuano.com.au'>
          Cebuano Digital
        </Link>
        <Box component='span'> | </Box>
        <Box component='span' sx={{ textAlign: 'end' }}>
          RealBOSS Admin Console ver. {appVersion}
        </Box>
        <Box component='span'> | </Box>
        <Box component='span' sx={{ alignItems: 'end', justifyContent: 'end' }}>
          realboss.ai is on Beta
        </Box>
      </Typography>
      <Box
        sx={{
          top: 'auto',
          bottom: 0,
          left: lgAbove ? '57vw' : mdAbove ? '42vw' : smAbove ? '14vw' : xsAbove ? '4vw' : '57vw',
          position: 'fixed',
          gap: 2,
          maxHeight: '500px',
          height: '100%',
          width: smAbove ? '100%' : '62%',
          display: `${!isChatOpen ? 'none' : 'flex'}`
        }}
      >
        <FloatingChat isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
      </Box>
      <SpeedDial
        ariaLabel='FooterButtons'
        sx={{
          top: 'auto',
          bottom: 25,
          left: lgAbove ? '94vw' : mdAbove ? '92vw' : smAbove ? '88vw' : xsAbove ? '80vw' : '94vw',
          position: 'fixed',
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          width: 64
        }}
        icon={
          openSpeedDial ? (
            <SpeedDialIcon />
          ) : isRobotOutline ? (
            <RobotOutline />
          ) : (
            <img alt='image' src='/images/pngegg-white.png' width='30' />
          )
        }
        onClick={handleToggleSpeedDial}
        open={openSpeedDial}
        FabProps={{
          sx: {
            bgcolor: openSpeedDial ? 'error.main' : 'primary.main',
            '&:hover': {
              bgcolor: openSpeedDial ? 'error.main' : 'primary.main'
            }
          },
          size: 'medium'
        }}
      >
        {openSpeedDial &&
          actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={action.onClick}
              FabProps={{ sx: { bgcolor: 'primary.main' }, size: 'medium' }}
              classes={classes}
            />
          ))}
      </SpeedDial>
      <Dialog open={open} onClose={setClose} aria-labelledby='virtual-assistant' maxWidth='sm' fullWidth>
        <DialogTitle id='virtual-assistant'>realboss.ai Expert service specializes the following tasks:</DialogTitle>
        <DialogContent>
          <List component='nav' aria-label='main va'>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PlayArrowIcon sx={{ fontSize: '1rem' }} />
                </ListItemIcon>
                <ListItemText primary='Utilizing realboss.ai Business Software' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PlayArrowIcon sx={{ fontSize: '1rem' }} />
                </ListItemIcon>
                <ListItemText primary='Creating effective digital marketing campaigns to enhance engagement and attract new clients' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PlayArrowIcon sx={{ fontSize: '1rem' }} />
                </ListItemIcon>
                <ListItemText primary='Managing customer service-related activities' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PlayArrowIcon sx={{ fontSize: '1rem' }} />
                </ListItemIcon>
                <ListItemText primary='Overseeing administrative tasks and organizing schedules' />
              </ListItemButton>
            </ListItem>
          </List>
          Get started today for just $12 per hour, with an initial deposit of $500 required.
        </DialogContent>
        <DialogActions sx={{ mt: 5 }}>
          <Button variant='contained' onClick={handleClose} color='secondary'>
            Close
          </Button>
          <Button variant='contained' onClick={handleConfirmVA} color='primary'>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default FooterContent
