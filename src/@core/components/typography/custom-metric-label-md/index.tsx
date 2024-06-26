import { Typography } from '@mui/material'

const CustomMetricLabelMd = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography
      variant='h2'
      sx={theme => ({
        fontWeight: '900',
        fontSize: '28px !important',
        color: theme.palette.common.black,
        letterSpacing: '0px'
      })}
    >
      {children}
    </Typography>
  )
}

export default CustomMetricLabelMd
