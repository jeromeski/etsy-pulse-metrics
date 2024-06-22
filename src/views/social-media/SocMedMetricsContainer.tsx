// **MUI Imports
// **React Imports
import React from 'react'
import { Grid } from '@mui/material'
// **Custom Components Imports
import BasicMetricsCard from 'src/molecules/card/basic-metrics-card'
// **Data Imports
import { SIMPLE_SOCMED_CARD_METRICS } from 'src/data'
import { Box } from '@mui/material'

const SocMedMetricsContainer = () => {
  return (
    <Grid container spacing={5}>
      {SIMPLE_SOCMED_CARD_METRICS.map(item => (
        <Grid key={item.id} xs={6} sm={4} md={3} lg={2}>
          <BasicMetricsCard
            title={item.title}
            keyMetricValue={item.keyMetricValue}
            growth={item.growth}
            likesComparisonDays={item.likesComparisonDays}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default React.memo(SocMedMetricsContainer)
