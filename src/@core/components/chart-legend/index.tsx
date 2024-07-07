// ** MUI Imports
import { styled } from '@mui/material/styles'
import { Theme, Box, Typography } from '@mui/material'
import { Circle } from '@mui/icons-material'

const ChartLegendWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginRight: '10px',
}))

const ChartLegend = ({ children, color = 'primary' }: { children: React.ReactNode; color: string }) => {
  return (
    <ChartLegendWrapper>
      <Circle sx={{ color: color, height: 'auto', width: {xs: '13px', sm: '15px'}, marginRight: '5px' }} />
      <Typography variant='body1' sx={{ fontSize: {xs: '12px', sm: '14px'} }}>
        {children}
      </Typography>
    </ChartLegendWrapper>
  )
}

export default ChartLegend
