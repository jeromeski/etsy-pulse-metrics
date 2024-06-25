// ** React Imports
import { Fragment, SyntheticEvent, useEffect, useState } from 'react'

// ** MUI Imports

import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'

// ** Icons Imports
import PublicIcon from '@mui/icons-material/Public'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'

// ** Redux Imports
import { RootStateOrAny } from 'react-redux'
import { useAppSelector } from 'src/store/index'
import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface Props {
  settings: Settings
}

const UserDropdown = (props: Props) => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const { logout } = useAuth()
  const userAvatar = useAppSelector((state: RootStateOrAny) => state.userAvatar)
  const { i18n } = useTranslation()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (lngValue?: string) => {
    if (lngValue) i18n.changeLanguage(lngValue)
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    },
    '&:hover': {
      border: 'none',
      backgroundColor: 'rgba(232, 232, 232, 0.8)'
    }
  }

  const languages = [
    { id: 1, language: 'English', value: 'en' },
    { id: 2, language: 'Spanish', value: 'es' },
    { id: 3, language: 'Japanese', value: 'ja' },
    { id: 4, language: 'Korean', value: 'ko' },
    { id: 5, language: 'Arabic', value: 'ar' },
    { id: 6, language: 'Chinese', value: 'zh' },
    { id: 7, language: 'French', value: 'fr' }
  ]

  return (
    <Fragment>
      <Tooltip title='Select Language'>
        <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
          <Badge color='error'>
            <PublicIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 150 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        {languages.map(item => (
          <MenuItem key={item.id} sx={{ p: 0 }} onClick={() => handleDropdownClose(item.value)}>
            <Box sx={styles}>{item.language}</Box>
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
