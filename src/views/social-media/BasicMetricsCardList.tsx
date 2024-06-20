// **MUI Imports
// **React Imports
import React from "react";
import { Box, Grid } from "@mui/material";
// **Custom Components Imports
import BasicMetricsCard from 'src/molecules/card/basic-metrics-card'
// **Data Imports
import { SIMPLE_SOCMED_CARD_METRICS } from 'src/data'

const BasicMetricsCardList = () => {
	return (
    <Grid container spacing={3}>
      {SIMPLE_SOCMED_CARD_METRICS.map(item => (
        <Grid key={item.id} xs={4}>
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
};

export default React.memo(BasicMetricsCardList);
