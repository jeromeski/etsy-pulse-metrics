// **Mui Imports
import { Grid, Box, MenuItem, Theme } from '@mui/material'
import BasicMetricsCardList from 'src/views/social-media/BasicMetricsCardList'
import BasicSocMedOverviewCard from 'src/molecules/card/basic-socmed-overview-card'
// import RechartsAreaChart from 'src/molecules/charts/react-charts'
import BasicSocMedAreaChart from 'src/views/social-media/BasicSocMedAreaChart'
import { useState } from 'react'
import ControlledChartSelect from 'src/@core/components/controlled-chart-select'
import { SelectChangeEvent } from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

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
  const [value, setValue] = useState<string>('')
  const handleChange = (event: SelectChangeEvent<string>) => {
    setValue(event.target.value as string)
  }

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
    //   <Grid item xs=12> <BasicSocMedAreaChart direction='ltr' /> </Grid>
    // </Grid>
  )
}

export default Home;
