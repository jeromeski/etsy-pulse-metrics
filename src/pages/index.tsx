// **Mui Imports
import { Grid, Box } from '@mui/material'
import SocMedOverviewContainer from 'src/views/social-media/overview'
import SocMedAreaChartContainer from 'src/views/social-media/area-chart'
import SocMedMetricsContainer from 'src/views/social-media/basic-metrics'
import FacebookDetailedAnalytics from 'src/views/social-media/detailed-analytics/facebook'
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'
import MetricTrendGraphMonitorTile from 'src/views/social-media/basic-metrics/TrendGraphMonitorTile'
import fakeFetch from 'src/@core/utils/fakeFetch'
import toast from 'react-hot-toast'
import { useState } from 'react'
import FbSpecificAnalyticsView from './../views/dashboards/social-media/FbSpecificAnalyticsView'

const Home = () => {
  const { isSmallScreen } = useDeviceSizesMediaQuery()

  return (
    <Grid container>
      <Grid item xs={0} lg={2}>
        <Box sx={{ height: '100vh', width: '100%', backgroundColor: 'grey' }}></Box>
      </Grid>
      <Grid item xs={12} lg={10}>
        <Grid container>
          {/* <Grid item xs={2}></Grid> */}
          <Grid item xs={12}>
            <FbSpecificAnalyticsView />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Home;
