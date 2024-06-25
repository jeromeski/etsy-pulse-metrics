import { useRouter } from 'next/router'

// ** React Imports
import { useState, SyntheticEvent, useContext, Fragment, ReactNode, useEffect, useRef } from 'react'

// ** Axios Imports
import axios from 'axios'

// ** Api import
import { updateAdminNotifications, getAdminNotifications, updateAllAdminNotifications } from 'src/apis'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu, { MenuProps } from '@mui/material/Menu'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Typography, { TypographyProps } from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import Modal from '@mui/material/Modal'
import Card from '@mui/material/Card'

// ** Icons Imports
import BellOutline from 'mdi-material-ui/BellOutline'
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined'
import MarkChatReadOutlinedIcon from '@mui/icons-material/MarkChatReadOutlined'
import RemoveDoneOutlinedIcon from '@mui/icons-material/RemoveDoneOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import NotificationsIcon from '@mui/icons-material/Notifications'
import DoneIcon from '@mui/icons-material/Done'
import UpdateIcon from '@mui/icons-material/Update'
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ScheduleSendOutlinedIcon from '@mui/icons-material/ScheduleSendOutlined'
import SnoozeIcon from '@mui/icons-material/Snooze'
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined'
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Socket Imports
// import { Socket } from 'socket.io-client'

import moment from 'moment'

// ** Context Imports
import { SocketContext } from 'src/context/SocketContext'

// import { SocketValues } from 'src/context/types'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'
import { CustomAvatarProps } from 'src/@core/components/mui/avatar/types'
import { ListItemIcon, ListItemText, Popover } from '@mui/material'



interface Props {
  settings: Settings
}

// **Type Imports
import { Notifications, Notification } from 'src/apis/types'

// ** Styled Menu component
const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 410,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`
}))

const styles = {
  maxHeight: 349,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  }
}

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles
})

// ** Styled Avatar component
const Avatar = styled(CustomAvatar)<CustomAvatarProps>({
  width: '2.375rem',
  height: '2.375rem',
  fontSize: '1.125rem'
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)<TypographyProps>({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

const NotificationDropdown = (props: Props) => {
  // ** Router
  const router = useRouter()

  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)
  const [notifications, setNotifications] = useState<Notification[] | null>(null)
  const [popoverAnchorEL, setPopoverAnchorEl] = useState<(EventTarget & Element) | null>(null)
  const [notificationType, setNotificationType] = useState<string>('')
  const [deleteNoteModal, setDeleteNoteModal] = useState<boolean>(false)
  const [notificationForDeletion, setNotificationForDeletion] = useState<string | undefined>('')

  // **Popover variables
  const open = Boolean(popoverAnchorEL)

  // ** Hook
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))
  const currentPath = useRouter().pathname

  // ** Vars
  const { direction } = settings

  // ** Context
  const { socket } = useContext(SocketContext)

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const handleClickNotification = async (notifId: string, route: string) => {
    setAnchorEl(null)
    await updateAdminNotifications(notifId)
    await handleFetchNotifications()

    router.push(`/${route}`)
  }

  const handleFetchNotifications = async () => {
    try {
      const resData = await getAdminNotifications()
      if (resData) {
        setNotifications([...resData?.notification])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleReadAllNotifications = async () => {
    await updateAllAdminNotifications()
      .then(response => {
        if (response instanceof axios.AxiosError) {
          throw new Error('An error has occurred!')
        } else {
          // setNotifications([...response?.data.notification])
          console.log(response)
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  const handleActionButtonClick = (event: SyntheticEvent, notificationTypeParam: string) => {
    event.stopPropagation()
    setPopoverAnchorEl(event.currentTarget)
    setNotificationType(notificationTypeParam)
  }

  const handleClosePopover = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    event.stopPropagation()

    setPopoverAnchorEl(null)
  }

  const deleteNoteModalOn = (noteId: string) => {
    setNotificationForDeletion(noteId)
    setDeleteNoteModal(true)
  }

  const deleteNoteModalOff = () => {
    setDeleteNoteModal(false)
  }

  // Assign specific actions for each type of notification
  const getActionsForNotificationType = (notification: Notification) => {
    switch (notificationType) {
      case 'New Client Registered':
        return [
          {
            label: notification.isOpened ? 'Mark as Unread' : 'Mark as Read',
            icon: notification.isOpened ? (
              <MarkChatUnreadOutlinedIcon color='info' />
            ) : (
              <MarkChatReadOutlinedIcon color='info' />
            ),
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              handleClosePopover(e)
              // Logic for the action here
            }
          },
          {
            label: 'Delete',
            icon: <DeleteOutlinedIcon color='error' />,
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              handleClosePopover(e)
              deleteNoteModalOn(notification._id)
              // Logic for the action here
            }
          }
        ]
      case 'New Partner Registered':
        return [
          {
            label: notification.isOpened ? 'Mark as Unread' : 'Mark as Read',
            icon: notification.isOpened ? (
              <MarkChatUnreadOutlinedIcon color='info' />
            ) : (
              <MarkChatReadOutlinedIcon color='info' />
            ),
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              handleClosePopover(e)
              // Logic for the action here
            }
          },
          {
            label: 'Delete',
            icon: <DeleteOutlinedIcon color='error' />,
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              handleClosePopover(e)
              deleteNoteModalOn(notification._id)
              // Logic for the action here
            }
          }
        ]

      case 'Sent a Quotation':
        return [
          {
            label: 'Edit Quotation',
            icon: <EditOutlinedIcon color='info' />,
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              handleClosePopover(e)
              // Logic for the action here
            }
          },
          {
            label: 'Book Quotation',
            icon: <AssignmentTurnedInOutlinedIcon color='info' />,
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              handleClosePopover(e)
              // Logic for the action here
            }
          },
          {
            label: 'Delete',
            icon: <DeleteOutlinedIcon color='error' />,
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              handleClosePopover(e)
              deleteNoteModalOn(notification._id)
              // Logic for the action here
            }
          }
        ]

      case 'Sent an Invoice':
        return [
          {
            label: notification.isPaid ? 'Mark as Unpaid' : 'Mark as Paid',
            icon: notification.isPaid ? <RemoveDoneOutlinedIcon color='info' /> : <DoneIcon color='info' />,
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              handleClosePopover(e)
              // Logic for the action here
            }
          },
          {
            label: 'Send Reminder',
            icon: <ScheduleSendOutlinedIcon color='info' />,
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              handleClosePopover(e)
              // Logic for action here
            }
          },
          {
            label: 'Download PDF',
            icon: <FileDownloadOutlinedIcon color='info' />,
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              handleClosePopover(e)
              // Logic for the action here
            }
          },
          {
            label: 'View Payment History',
            icon: <PreviewOutlinedIcon color='info' />,
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              handleClosePopover(e)
              // Logic for action here
            }
          },
          {
            label: 'Edit Invoice',
            icon: <EditOutlinedIcon color='info' />,
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              handleClosePopover(e)
              // Logic for action here
            }
          },
          {
            label: 'Delete',
            icon: <DeleteOutlinedIcon color='error' />,
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              handleClosePopover(e)
              deleteNoteModalOn(notification._id)
              // Logic for action here
            }
          }
        ]

      case 'New Post Scheduled':
        return [
          {
            label: notification.isDone ? 'Mark as Undone' : 'Mark as Done',
            icon: notification.isDone ? <RemoveDoneOutlinedIcon color='info' /> : <DoneIcon color='info' />,
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              handleClosePopover(e)
              // Logic for action here
            }
          },
          {
            label: notification.isOpened ? 'Mark as Unread' : 'Mark as Read',
            icon: notification.isOpened ? (
              <MarkChatUnreadOutlinedIcon color='info' />
            ) : (
              <MarkChatReadOutlinedIcon color='info' />
            ),
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              handleClosePopover(e)
              // Logic for the action here
            }
          },
          {
            label: 'Reschedule Post',
            icon: <UpdateIcon color='info' />,
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              handleClosePopover(e)
              // Logic for the action here
            }
          },
          {
            label: 'Cancel Post',
            icon: <CancelScheduleSendIcon color='error' />,
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              handleClosePopover(e)
              // Logic for the action here
            }
          },
          {
            label: 'Delete',
            icon: <DeleteOutlinedIcon color='error' />,
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              handleClosePopover(e)
              deleteNoteModalOn(notification._id)
              // Logic for the action here
            }
          }
        ]

      case 'New Booking Request':
        return [
          {
            label: notification.isDone ? 'Mark as Undone' : 'Mark as Done',
            icon: notification.isDone ? <RemoveDoneOutlinedIcon color='info' /> : <DoneIcon color='info' />,
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              handleClosePopover(e)
              // Logic for the action here
            }
          },
          {
            label: notification.isOpened ? 'Mark as Unread' : 'Mark as Read',
            icon: notification.isOpened ? (
              <MarkChatUnreadOutlinedIcon color='info' />
            ) : (
              <MarkChatReadOutlinedIcon color='info' />
            ),
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              handleClosePopover(e)
              // Logic for action here
            }
          },
          {
            label: 'Delete',
            icon: <DeleteOutlinedIcon color='error' />,
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              handleClosePopover(e)
              deleteNoteModalOn(notification._id)
              // Logic for the action here
            }
          }
        ]

      default:
        return [
          {
            label: notification.isOpened ? 'Mark as Unread' : 'Mark as Read',
            icon: notification.isOpened ? (
              <MarkChatUnreadOutlinedIcon color='info' />
            ) : (
              <MarkChatReadOutlinedIcon color='info' />
            ),
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              handleClosePopover(e)
              // Logic for the action here
            }
          },
          {
            label: 'Delete',
            icon: <DeleteOutlinedIcon color='error' />,
            onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              handleClosePopover(e)
              deleteNoteModalOn(notification._id)
              // Logic for action here
            }
          }
        ]
    }
  }

  useEffect(() => {
    let isMounted = true

    handleFetchNotifications()

    socket?.on('newNotification', () => {
      if (isMounted) {
        handleFetchNotifications()
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Fragment>
      <Tooltip title='Notifications'>
        <IconButton
          color='inherit'
          aria-haspopup='true'
          onClick={handleDropdownOpen}
          aria-controls='customized-menu'
          disabled={currentPath === '/notifications'}
        >
          <Badge
            badgeContent={notifications?.filter(notification => notification.isOpened === false).length}
            color='error'
          >
            {currentPath === '/notifications' ? <NotificationsIcon style={{ color: '#1976d2' }} /> : <BellOutline />}
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <MenuItem disableRipple>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ fontWeight: 600 }}>Reminders and Notifications</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CustomChip
                skin='light'
                size='small'
                label={notifications?.filter(notification => notification.isOpened === false).length + ' new'}
                color='primary'
                sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
              />
              <Tooltip title='Notification Settings'>
                <IconButton
                  size='small'
                  onClick={() => {
                    setAnchorEl(null)
                    router.push('/notification-settings')
                  }}
                >
                  <SettingsOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </MenuItem>
        <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>
          {notifications?.map((notification): any => (
            <MenuItem
              disableRipple
              onClick={() => handleClickNotification(notification._id, notification.route)}
              key={notification._id}
            >
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <Badge color='primary' variant='dot' invisible={notification.isOpened}>
                  <Avatar
                    alt='Flora'
                    src={
                      notification.route === 'appointments'
                        ? '/images/avatars/4.png'
                        : notification.route === 'clients'
                        ? '/images/avatars/3.png'
                        : '/images/avatars/5.png'
                    }
                  />
                </Badge>
                <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                  <MenuItemTitle>{notification.type}</MenuItemTitle>

                  <MenuItemSubtitle variant='body2'>{notification.description}</MenuItemSubtitle>
                </Box>
                <Typography variant='caption' sx={{ color: notification.isOpened ? 'text.disabled' : '#1976d2' }}>
                  {moment(notification.createdAt).fromNow()}
                </Typography>
                <Box>
                  <Tooltip title='Actions'>
                    <IconButton
                      id='actions-button'
                      aria-controls={open ? 'actions-menu' : undefined}
                      aria-haspopup='true'
                      aria-expanded={open ? 'true' : undefined}
                      size='medium'
                      style={{
                        marginLeft: 10
                      }}
                      disableRipple
                      onClick={event => handleActionButtonClick(event, notification.type)}
                    >
                      <MoreHorizIcon />
                    </IconButton>
                  </Tooltip>
                  <Popover
                    id='actions-menu'
                    open={open}
                    anchorEl={popoverAnchorEL}
                    onClose={handleClosePopover}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left'
                    }}
                  >
                    {getActionsForNotificationType(notification).map((action, index) => (
                      <MenuItem key={index} onClick={action.onClick}>
                        <ListItemIcon>{action.icon}</ListItemIcon>
                        <ListItemText>{action.label}</ListItemText>
                      </MenuItem>
                    ))}
                  </Popover>
                </Box>
              </Box>
            </MenuItem>
          ))}

          {/* <MenuItem onClick={handleDropdownClose}>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Avatar alt='Flora' src='/images/avatars/4.png' />
              <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                <MenuItemTitle>New Client Registered</MenuItemTitle>
                <MenuItemSubtitle variant='body2'>Andy Brylle is our new client</MenuItemSubtitle>
              </Box>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                Today
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleDropdownClose}>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Avatar alt='Flora' src='/images/avatars/4.png' />
              <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                <MenuItemTitle>New Partner Registered</MenuItemTitle>
                <MenuItemSubtitle variant='body2'>Hosea is now a partner</MenuItemSubtitle>
              </Box>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                Today
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleDropdownClose}>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Avatar alt='Flora' src='/images/misc/paypal.png' />
              <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                <MenuItemTitle>Payment Pending</MenuItemTitle>
                <MenuItemSubtitle variant='body2'>$1000</MenuItemSubtitle>
              </Box>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                Today
              </Typography>
            </Box>
          </MenuItem> */}
          {/* <MenuItem onClick={handleDropdownClose}>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Avatar skin='light'>VU</Avatar>
              <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                <MenuItemTitle>New user registered.</MenuItemTitle>
                <MenuItemSubtitle variant='body2'>5 hours ago</MenuItemSubtitle>
              </Box>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                Yesterday
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleDropdownClose}>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Avatar alt='message' src='/images/avatars/5.png' />
              <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                <MenuItemTitle>New message received 👋🏻</MenuItemTitle>
                <MenuItemSubtitle variant='body2'>You have 10 unread messages</MenuItemSubtitle>
              </Box>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                11 Aug
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleDropdownClose}>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <img width={38} height={38} alt='paypal' src='/images/misc/paypal.png' />
              <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                <MenuItemTitle>Paypal</MenuItemTitle>
                <MenuItemSubtitle variant='body2'>Received Payment</MenuItemSubtitle>
              </Box>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                25 May
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleDropdownClose}>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Avatar alt='order' src='/images/avatars/3.png' />
              <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                <MenuItemTitle>Revised Order 📦</MenuItemTitle>
                <MenuItemSubtitle variant='body2'>New order revised from john</MenuItemSubtitle>
              </Box>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                19 Mar
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleDropdownClose}>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <img width={38} height={38} alt='chart' src='/images/misc/chart.png' />
              <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                <MenuItemTitle>Finance report has been generated</MenuItemTitle>
                <MenuItemSubtitle variant='body2'>25 hrs ago</MenuItemSubtitle>
              </Box>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                27 Dec
              </Typography>
            </Box>
          </MenuItem> */}
        </PerfectScrollbar>
        <MenuItem
          disableRipple
          sx={{ py: 3.5, borderBottom: 0, borderTop: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Button
            fullWidth
            variant='contained'
            onClick={() => {
              router.push('/notifications')
              setAnchorEl(null)
            }}
          >
            Show All Notifications
          </Button>
        </MenuItem>
      </Menu>
      <Modal
        open={deleteNoteModal}
        onClose={deleteNoteModalOff}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Card
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography id='modal-modal-title' variant='h6' component='h3'>
            Are you sure you want to delete this notification?
          </Typography>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', mt: 2, gap: 2 }}>
            <Button variant='contained'>Yes</Button>
            <Button variant='contained' sx={{ backgroundColor: 'gray', ':hover': { bgcolor: '#949AA0' } }}>
              No
            </Button>
          </Box>
        </Card>
      </Modal>
    </Fragment>
  )
}

export default NotificationDropdown
