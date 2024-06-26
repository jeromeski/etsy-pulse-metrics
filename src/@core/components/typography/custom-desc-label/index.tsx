import {Typography} from '@mui/material'

const CustomDescLabel = ({children}: {children: React.ReactNode}) => {
  return <Typography
              variant='body1'
              sx={theme => ({
                fontSize: '14px',
                fontWeight: '700',
                color: theme.palette.text.primary,
                letterSpacing: '0px'
              })}
            >
              {children}
            </Typography>
}

export default CustomDescLabel