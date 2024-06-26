// ** MUI Imports
import { styled } from '@mui/material/styles'
import { Theme, MenuItem, Box, Card, Typography, CardContent, SelectChangeEvent } from '@mui/material'

const CardAreaChartLegend = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginBottom: '.5rem'
}))

export default CardAreaChartLegend
