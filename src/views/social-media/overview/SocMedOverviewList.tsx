// **Mui Imports
import { Box, Grid } from '@mui/material'
// **Data Imports
import { SIMPLE_SOCMED_CARD_METRICS } from 'src/data'
// **Custom Component Imports
import BasicSocMedOverviewItem from 'src/views/social-media/overview/SocMedOverviewItem'

const BasicSocMedOverviewList = () => {
  return (
    <Box>
      <Grid
        container
        sx={theme => ({
          justifyContent: 'center',
          [theme.breakpoints.between('md', 'lg')]: {
            justifyContent: 'flex-start'
          }
        })}
      >
        {SIMPLE_SOCMED_CARD_METRICS ? (
          SIMPLE_SOCMED_CARD_METRICS?.map(item => (
            <BasicSocMedOverviewItem
              key={item.id}
              iconURL={item.iconURL}
              title={item.title}
              keyMetricValue={item.keyMetricValue}
            />
          ))
        ) : (
          <></>
        )}
      </Grid>
    </Box>
  )
}

export default BasicSocMedOverviewList
