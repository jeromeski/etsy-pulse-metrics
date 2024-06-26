import { Grid, Box } from '@mui/material'

const FacebookDetailedAnalytics = () => {
  return (
    <Grid container>
      <Grid item xs={0} lg={2}>
        <Box sx={{ height: '100vh', width: '100%', backgroundColor: 'grey' }}></Box>
      </Grid>
      <Grid item xs={12} lg={10}>
        <Grid container>
          <Grid item xs={2}>
            <Box sx={{ width: '100%', backgroundColor: 'blue' }}></Box>
          </Grid>
          <Grid item xs={10}>
            <Box sx={{ width: '100%', backgroundColor: 'light-blue' }}></Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default FacebookDetailedAnalytics
