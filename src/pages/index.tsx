// **Mui Imports
import { Grid, Box } from '@mui/material'
import SocMedOverviewContainer from 'src/views/social-media/overview'
import SocMedAreaChartContainer from 'src/views/social-media/area-chart'
import SocMedMetricsContainer from 'src/views/social-media/basic-metrics'

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
          <SocMedOverviewContainer />
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
