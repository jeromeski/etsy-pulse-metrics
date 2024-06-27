// **Mui Imports
import { Grid, Box } from '@mui/material'
import SocMedOverviewContainer from 'src/views/social-media/overview'
import SocMedAreaChartContainer from 'src/views/social-media/area-chart'
import SocMedMetricsContainer from 'src/views/social-media/basic-metrics'
import FacebookDetailedAnalytics from 'src/views/social-media/detailed-analytics/facebook'

const Home = () => {
  return (
    <Grid container>
      <Grid item xs={0} lg={2}>
        <Box sx={{ height: '100vh', width: '100%', backgroundColor: 'grey' }}></Box>
      </Grid>
      <Grid item xs={12} lg={10}>
        <Grid container>
          <Grid item xs={12}>
            <FacebookDetailedAnalytics />
          </Grid>
          <Grid item xs={10}></Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Home;
