// ** React Imports
import { Fragment, SyntheticEvent, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'

// ** Icons Imports
import LinkIcon from '@mui/icons-material/Link'
import LanguageIcon from '@mui/icons-material/Language'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import CogOutline from 'mdi-material-ui/CogOutline'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import MessageOutline from 'mdi-material-ui/MessageOutline'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'
import { UserProps } from 'src/@core/layouts/types'

// ** Redux Imports
import { RootStateOrAny } from 'react-redux'
import { useAppSelector } from 'src/store/index'

interface Props {
  settings: Settings
}


// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = (props: Props) => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const [userData, setUserData] = useState<UserProps | undefined | null>(null)
  const [imgSrc, setImgSrc] = useState<string | undefined>('')

  // ** Hooks
  const router = useRouter()
  const { logout } = useAuth()
  const userAvatar = useAppSelector((state: RootStateOrAny) => state.userAvatar)

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
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
    }
  }

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }

  useEffect(() => {
    if (userAvatar?.profilePhoto !== null) {
      setImgSrc(userAvatar?.profilePhoto)
    }
  }, [userAvatar])

  useEffect(() => {
    let isMounted = true
    const getUserData = async () => {
      if (isMounted) {
        try {
          const user: string | null = await window.localStorage.getItem('userData')
          if (user) {
            const parsedUser = JSON.parse(user)
            setUserData(parsedUser)
            setImgSrc(parsedUser.profilePhoto)
          }
        } catch (error) {
          console.log('Error fetching user data:', error)
        }
      }
    }

    getUserData()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Fragment>
      <Tooltip title='Account'>
        <Badge
          overlap='circular'
          onClick={handleDropdownOpen}
          sx={{ ml: 2, cursor: 'pointer' }}
          badgeContent={<BadgeContentSpan />}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        >
          <Avatar
            alt={`${userData?.firstname} ${userData?.lastname}`}
            onClick={handleDropdownOpen}
            sx={{ width: 40, height: 40 }}
            src={imgSrc}
          />
        </Badge>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Avatar
                alt={`${
                  JSON.parse(window.localStorage.getItem('userData') as string)?.firstname || userData?.firstname
                } ${JSON.parse(window.localStorage.getItem('userData') as string)?.lastname || userData?.lastname}`}
                src={imgSrc}
                sx={{ width: '2.5rem', height: '2.5rem' }}
              />
            </Badge>
            <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{`${
                JSON.parse(window.localStorage.getItem('userData') as string)?.firstname || userData?.firstname
              } ${
                JSON.parse(window.localStorage.getItem('userData') as string)?.lastname || userData?.lastname
              }`}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {userData ? userData.role.charAt(0).toUpperCase() + userData.role.slice(1) : ''}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/pages/account-settings')}>
          <Box sx={styles}>
            <AccountOutline sx={{ marginRight: 2 }} />
            Profile
          </Box>
        </MenuItem>
        <Divider />
        {userData?.role === 'admin' && (
          <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/pages/settings')}>
            <Box sx={styles}>
              <CogOutline sx={{ marginRight: 2 }} />
              Company Settings
            </Box>
          </MenuItem>
        )}
        {/* <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/pages/pricing')}>
          <Box sx={styles}>
            <CurrencyUsd sx={{ marginRight: 2 }} />
            Pricing
          </Box>
        </MenuItem> */}
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/pages/connected-accounts')}>
          <Box sx={styles}>
            <LinkIcon sx={{ marginRight: 2 }} />
            Connected Accounts
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={handleLogout}>
          <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
