import React, { useState } from 'react'
import { Box, IconButton, Menu, MenuItem } from '@mui/material'

interface ControlledIconMenuButtonProps {
  icon: React.ReactNode
  renderMenuItems?: ((closeMenu: () => void) => React.ReactNode | React.ReactElement) | undefined | void
  renderCommentItem?: ((closeMenu: () => void) => React.ReactNode | React.ReactElement) | undefined | void
}

const ControlledIconMenuButton: React.FC<ControlledIconMenuButtonProps> = ({
  icon,
  renderMenuItems,
  renderCommentItem
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open: boolean = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <IconButton size='small' sx={{ paddingTop: 0, paddingBottom: 0 }} onClick={handleClick} id='icon-button'>
        {icon}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
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
        {renderCommentItem ? renderCommentItem(handleClose) : null}
      </Menu>
    </Box>
  )
}

export default ControlledIconMenuButton
