// ** MUI Imports
import { styled } from '@mui/material/styles'
import { Theme, MenuItem, Box, Card, Typography, CardContent, SelectChangeEvent } from '@mui/material'

const CardAreaChartHeader = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  '& > :nth-child(2) > :nth-child(1) > :nth-child(1)': {
    padding: '0 25px !important', margin: 0
  },
  [theme.breakpoints.between('sm', 'xl')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'unset'
  }
}))

export default CardAreaChartHeader
