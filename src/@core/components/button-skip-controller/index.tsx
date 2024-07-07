// **Mui Imports
import { Box, ButtonGroup, Button, ButtonProps, Typography } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'

// **Hook Imports
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'

// **Icon Imports
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

const StyledButton = styled(Button)<ButtonProps>(({ theme }: { theme: Theme }) => ({
  '&.MuiButton-contained': {
    backgroundColor: `${theme.palette.grey[100]} !important`,
    paddingRight: theme.spacing(5),
    color: theme.palette.text.secondary,
    borderColor: `${theme.palette.grey[200]} !important`,
    fontSize: '14px',
    boxShadow: 'none !important',
  },
  '&:hover': {
    backgroundColor: `${theme.palette.grey[200]} !important`
  },
  '&.Mui-disabled': {
    backgroundColor: `${theme.palette.grey[50]} !important`,
    color: theme.palette.text.disabled
  },
  '&:focus': {
    outline: 'none !important',
    boxShadow: 'none !important'
  },
  '&:active': {
    outline: 'none !important',
    boxShadow: 'none !important'
  }
}))

const StyledButtonGroup = styled(ButtonGroup)(({ theme }: { theme: Theme }) => ({
  '&.MuiButtonGroup-root': {
    backgroundColor: `${theme.palette.grey[100]} !important`
  },
  '&.MuiButtonGroup-grouped:not(:last-of-type)': {
    borderColor: `${theme.palette.grey[300]} !important`
  },
  '& .MuiButton-root': {
    color: theme.palette.text.primary,
    borderColor: 'darkgrey !important',
    borderStyle: 'solid',
    padding: '2px 10px !important',
    '&:hover': {
      backgroundColor: `${theme.palette.grey[200]} !important`
    },
    '&.Mui-disabled': {
      backgroundColor: `${theme.palette.grey[50]} !important`,
      color: theme.palette.text.disabled
    },
    '&:focus': {
      outline: 'none !important',
      boxShadow: 'none !important'
    },
    '&:active': {
      outline: 'none !important',
      boxShadow: 'none !important'
    }
  }
}))


interface ButtonSkipControllerType {
  data?: string
  increaseCountHandler?: () => void
  decreaseCountHandler?: () => void
}

const ButtonSkipController = ({ data, increaseCountHandler, decreaseCountHandler }: ButtonSkipControllerType) => {
  const {isSmallScreen} = useDeviceSizesMediaQuery()
  return (
    <Box sx={{ marginLeft: {xs: 'auto', sm: '0'}}}>
      <StyledButtonGroup size='small' >
        {!isSmallScreen && data ? (
          <StyledButton disabled>
            <Typography variant='body2' sx={{ fontWeight: 500 }}>
              {data}
            </Typography>
          </StyledButton>
        ) : <></>}
        <Button onClick={decreaseCountHandler}>
          <ChevronLeft sx={{color: 'grey'}}/>
        </Button>
        <Button onClick={increaseCountHandler}>
          <ChevronRight sx={{color: 'grey'}}/>
        </Button>
      </StyledButtonGroup>
    </Box>
  )
}

export default ButtonSkipController
