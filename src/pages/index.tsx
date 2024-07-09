// **Mui Imports
import { Grid, Box } from '@mui/material'
// **Custom Components
import SocMedDailyImpressionsChart from 'src/views/dashboards/social-media/SocMedDailyImpressionsChart'
import SocMedEngagementBarChart from 'src/views/dashboards/social-media/SocMedEngagementBarChart'
import SocMedVisitsPerCountry from 'src/views/dashboards/social-media/SocMedVisitsPerCountry'
import SocMedDailyMetricsInsight from 'src/views/dashboards/social-media/SocMedDailyMetricsInsight'
// **Hooks Imports
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'
import SocMedImpressionsBarChart from 'src/views/dashboards/social-media/SocMedImpressionsBarChart'

const Home = () => {
  return (
    <Grid container>
      <Grid item xs={0} lg={2}>
        <Box sx={{ height: '100vh', width: '100%', backgroundColor: 'grey' }}></Box>
      </Grid>
      <Grid item xs={12} lg={10}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SocMedImpressionsBarChart />
          </Grid>

          <Grid item xs={12}>
            <SocMedDailyMetricsInsight />
          </Grid>
          <Grid item xs={12}>
            <SocMedEngagementBarChart />
          </Grid>
          <Grid item xs={12}>
            <SocMedDailyImpressionsChart />
          </Grid>
          <Grid item xs={12}>
            <SocMedVisitsPerCountry />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
} 

export default Home
