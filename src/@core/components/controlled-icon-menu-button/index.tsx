import React, { useEffect, useState } from 'react'
import { Box, IconButton, Menu, MenuItem } from '@mui/material'

interface ControlledIconMenuButtonProps {
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
  isLoading?: boolean | null
  icon: React.ReactNode
  renderMenuItems?: ((closeMenu: () => void) => React.ReactNode | React.ReactElement) | undefined | void
  renderCommentItem?: ((closeMenu: () => void) => React.ReactNode | React.ReactElement) | undefined | void
}

const ControlledIconMenuButton: React.FC<ControlledIconMenuButtonProps> = ({
  icon,
  renderMenuItems,
  renderCommentItem,
  isLoading,
  setIsLoading
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [commentActive, setCommentActive] = useState(false)
  const open: boolean = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleCommentItemClick = (closeMenu: () => void) => {
    setCommentActive(true)
    closeMenu()
  }

  useEffect(() => {
    if (setIsLoading) {
      if (!isLoading && commentActive) {
        setAnchorEl(null)
        setCommentActive(false)
        setIsLoading(false)
      }
    }
  }, [isLoading, commentActive, setIsLoading])

  return (
    <Box>
      <IconButton size='small' sx={{ paddingTop: 0, paddingBottom: 0 }} onClick={handleClick} id='icon-button'>
        {icon}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={!isLoading ? handleClose : undefined}
        keepMounted
        MenuListProps={{
          'aria-labelledby': 'icon-button'
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        {renderMenuItems ? renderMenuItems(handleClose) : null}
        {renderCommentItem?.(() => handleCommentItemClick(handleClose))}
      </Menu>
    </Box>
  )
}

export default ControlledIconMenuButton
