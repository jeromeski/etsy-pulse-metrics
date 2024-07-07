// ** MUI Imports
import { styled } from '@mui/material/styles'
import { Theme, Box, Typography } from '@mui/material'
import { Circle } from '@mui/icons-material'

const CardContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginBottom: '.5rem'
}))

const CardAreaChartLegend = ({ children }: { children: React.ReactNode }) => {
  return (
    <CardContainer>
      <Circle
        sx={(theme: Theme) => ({
          color: theme.palette.primary.main,
          height: 'auto',
          width: '15px',
          marginRight: '5px'
        })}
      />
      <Typography
        variant='body1'
        sx={(theme: Theme) => ({
          fontSize: '.9rem'
        })}
      >
        {children}
      </Typography>
    </CardContainer>
  )
}

export default CardAreaChartLegend
