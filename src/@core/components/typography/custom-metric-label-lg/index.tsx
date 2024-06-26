import { Typography } from '@mui/material'

const CustomMetricLabelLg = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography
      variant='h2'
      sx={theme => ({
        fontWeight: '900',
        color: theme.palette.common.black,
        fontSize: {
          xs: '30px',
          md: '32px'
        },
        letterSpacing: '0px'
      })}
    >
      {children}
    </Typography>
  )
}

export default CustomMetricLabelLg
