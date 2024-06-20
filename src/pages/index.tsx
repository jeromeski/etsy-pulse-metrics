// **Mui Imports
import { Grid, Box } from '@mui/material'
import BasicMetricsCardList from '@/views/social-media/BasicMetricsCardList'
import BasicSocMedOverviewCard from '@/molecules/card/basic-socmed-overview-card'
// import RechartsAreaChart from '@/molecules/charts/react-charts'
import BasicSocMedAreaChart from '@/views/social-media/BasicSocMedAreaChart'

const Home = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={9}>
        <BasicSocMedAreaChart direction='ltr' />
      </Grid>
    </Grid>
    // <Grid container spacing={3}>
    //   <Grid item xs={6}>
    //     <RechartsAreaChart direction='ltr' />
    //   </Grid>
    //   <Grid item xs={6}>
    //     <BasicSocMedOverviewCard />
    //   </Grid>
    //   <Grid item xs={7}>
    //     <BasicMetricsCardList />
    //   </Grid>
    // </Grid>
  )
}

export default Home;
