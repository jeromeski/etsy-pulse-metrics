// **React Imports
import React, { useState, useEffect } from 'react'

// **Mui Imports
import { Box } from '@mui/material'

// **Custom Components Imports
import BasicMetricsCardItem from 'src/views/social-media/basic-metrics/BasicMetricsCardItem'

// **Hooks Imports
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'

// **Data Imports
// import { SIMPLE_SOCMED_CARD_METRICS } from 'src/views/social-media/data'
import { daily, weekly, monthly } from 'src/views/social-media/data/fb'
import TrendGraphMonitorTile from 'src/views/social-media/basic-metrics/TrendGraphMonitorTile'

// **Type Imports
import { DailyDataProps, DataProps } from 'src/views/social-media/types'

const SocMedBasicMetrics = () => {
  const dailyData: DailyDataProps[] = daily
  const weeklyData: DataProps[] = weekly
  const monthlyData: DataProps[] = monthly

  if (dailyData && weeklyData && monthlyData) {
    return (
      <Box
        sx={theme => ({
          display: 'flex',
          flexWrap: 'wrap',
          justifycontent: 'space-between',
          gap: '10px'
        })}
      >
        <TrendGraphMonitorTile
          title='Average Weekly Likes'
          total={weeklyData[0].avg_likes}
          growth={weeklyData[0].trend_likes}
          compareDays={7}
          graphData={weeklyData.splice(0, 7)}
          dataKey='total_likes'
          stackId='date'
        />

        <TrendGraphMonitorTile
          title='Average Weekly Reach'
          total={weeklyData[0].avg_reach}
          growth={weeklyData[0].trend_reach}
          compareDays={weeklyData[0].compareDays}
          graphData={dailyData.splice(0, 14)}
          dataKey='reach'
          stackId='date'
        />

        <TrendGraphMonitorTile
          title='Average Monthly Impression'
          total={monthly[0].impressions}
          growth={monthly[0].trend_impressions}
          compareDays={monthly[0].compareDays}
          graphData={dailyData.splice(0, 30)}
          dataKey='impressions'
          stackId='date'
        />

        <BasicMetricsCardItem
          title='Likes'
          keyMetricValue={dailyData[0].post_likes}
          growth={dailyData[0].trend_likes}
          compareDays={dailyData[0].compareDays}
        />

        <BasicMetricsCardItem
          title='Engagement'
          keyMetricValue={dailyData[1].engagements}
          growth={dailyData[1].trend_engagements}
          compareDays={dailyData[1].compareDays}
        />

        <BasicMetricsCardItem
          title='Reach'
          keyMetricValue={monthlyData[0].total_reach}
          growth={monthlyData[0].trend_reach}
          compareDays={monthlyData[0].compareDays}
        />
      </Box>
    )
  } else {
    return <></>
  }
}

export default React.memo(SocMedBasicMetrics)
