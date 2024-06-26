// **Mui Imports
import { Box, ButtonGroup, Button, ButtonProps, Typography } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'
// **Icon Imports
import IconButton from '@mui/material/IconButton'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

const StyledButton = styled(Button)<ButtonProps>(({ theme }: { theme: Theme }) => ({
  '&.MuiButton-contained': {
    backgroundColor: `${theme.palette.grey[100]} !important`,
    paddingRight: theme.spacing(5),
    color: theme.palette.text.primary,
    borderColor: `${theme.palette.grey[200]} !important`,
    fontSize: '14px'
  }
}))

const StyledButtonGroup = styled(ButtonGroup)(({ theme }: { theme: Theme }) => ({
  '&.MuiButtonGroup-root': {
    backgroundColor: `${theme.palette.grey[100]} !important`
  },
  '&.MuiButtonGroup-grouped:not(:last-of-type)': {
    borderColor: `${theme.palette.grey[300]} !important`
  }
}))

interface ButtonSkipControllerType {
  data?: string
  increaseCountHandler?: () => void
  decreaseCountHandler?: () => void
}

const ButtonSkipController = ({ data, increaseCountHandler, decreaseCountHandler }: ButtonSkipControllerType) => {
  
  return (
    <Box sx={{ marginLeft: {xs: 'auto', sm: '0'}}}>
      <StyledButtonGroup size='small' variant='contained'>
        {data && (
          <StyledButton disabled size='small' variant='contained'>
            <Typography variant='body2' sx={{ fontWeight: 500 }}>
              {data}
            </Typography>
          </StyledButton>
        )}
        <IconButton size='small' onClick={decreaseCountHandler}>
          <ChevronLeft />
        </IconButton>
        <IconButton size='small' onClick={increaseCountHandler}>
          <ChevronRight />
        </IconButton>
      </StyledButtonGroup>
    </Box>
  )
}

export default ButtonSkipController
