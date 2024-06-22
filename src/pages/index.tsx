// **Mui Imports
import { Grid, Box } from '@mui/material'
import BasicSocMedOverviewCard from 'src/molecules/card/basic-socmed-overview-card'
// import RechartsAreaChart from 'src/molecules/charts/react-charts'
import SocMedAreaChartContainer from 'src/views/social-media/SocMedAreaChartContainer'
import SocMedMetricsContainer from 'src/views/social-media/SocMedMetricsContainer'

interface RenderOptionProp {
  id?: string
  value: string
  label: string
}

const options = [
  { id: '1abcde', value: '90', label: 'last 90 days' },
  { id: '2bcdef', value: '60', label: 'last 60 days' },
  { id: '3cdefg', value: '30', label: 'last 30 days' }
]

const Home = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box>
          <SocMedAreaChartContainer direction='ltr' />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ marginBottom: '1rem' }}>
          <BasicSocMedOverviewCard />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box>
          <SocMedMetricsContainer />
        </Box>
      </Grid>
    </Grid>
  )
}

export default Home;
