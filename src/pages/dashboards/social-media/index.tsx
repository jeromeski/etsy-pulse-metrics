// **Mui Imports
import { Grid } from '@mui/material'
// **Custom Component Imports
import SocMedVisitsPerCountry from 'src/views/dashboards/social-media/SocMedVisitsPerCountry'
import SocMedVisitorsLocation from 'src/views/dashboards/social-media/SocMedVisitorsLocation'
import SocMedSiteVisits from 'src/views/dashboards/social-media/SocMedSiteVisits'
import SocMedDailyMetricsInsight from 'src/views/dashboards/social-media/SocMedDailyMetricsInsight'
import SocMedBasicMetrics from 'src/views/dashboards/social-media/SocMedBasicMetrics'
import SocMedOverview from 'src/views/dashboards/social-media/SocMedOverview'
import SocMedDailyReachChart from 'src/views/dashboards/social-media/SocMedDailyReachChart'
import SocMedDailyImpressionsChart from 'src/views/dashboards/social-media/SocMedDailyImpressionsChart'
import SocMedOverviewChart from 'src/views/dashboards/social-media/SocMedOverviewChart'

// **Hook Imports
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'

const SocialMediaDashboard = () => {
  const { isMobileXs, isMobileS, isMobileM, isTablet, isLaptop, isLaptopL, isDesktop } = useDeviceSizesMediaQuery()
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={isTablet || isLaptop ? 12 : 6}>
        <SocMedOverview />
      </Grid>
      <Grid item xs={12} md={isTablet || isLaptop ? 12 : 6}>
        <SocMedDailyReachChart direction='ltr' />
      </Grid>
      <Grid item xs={12} md={isTablet || isLaptop ? 12 : 6}>
        <SocMedDailyImpressionsChart direction='ltr' />
      </Grid>
      <Grid item xs={12} md={isTablet || isLaptop ? 12 : 6}>
        <SocMedOverviewChart direction='ltr' />
      </Grid>
      <Grid item xs={12} md={6}>
        <SocMedVisitsPerCountry />
      </Grid>
      <Grid item xs={12} md={6}>
        <SocMedVisitorsLocation />
      </Grid>
      {isTablet ? (
        <Grid item xs={12} md={isLaptop ? 12 : 4}>
          <SocMedSiteVisits />
        </Grid>
      ) : (
        <></>
      )}
      <Grid item xs={12} md={isLaptop ? 12 : 8} lg={12}>
        <SocMedBasicMetrics />
      </Grid>
      <Grid item xs={12} md={isLaptop || isLaptopL ? 6 : 12}>
        <SocMedDailyMetricsInsight />
      </Grid>
    </Grid>
  )
}

export default SocialMediaDashboard
