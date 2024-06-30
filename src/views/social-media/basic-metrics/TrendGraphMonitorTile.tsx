// ** React Imports
import React, { useState, useEffect, FormEvent } from 'react'

//  **Mui Imports
import { Card, CardHeader, CardContent, Box } from '@mui/material'

// **Recharts Imports
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

// **Custom Components
import MetricTotalHeading from 'src/@core/components/typography/metric-total-heading'
import TitleCardHeader from 'src/@core/components/typography/title-card-header'
import TrendPercentageIndicator from 'src/@core/components/typography/trend-percentage-indicator'
import CustomDescLabel from 'src/@core/components/typography/custom-desc-label'
import TrendGraphMonitorTileAction from './TrendGraphMonitorTileAction'

// **Util Imports
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'

interface FbMetrics30dProps {
  id: string
  title: string
  keyMetricValue: string
  growth: string
  likesComparisonDays: string
  iconURL: string
}

interface FbGraphData30dProps {
  date: string
  pageLikes: number
  postLikes: number
  comments: number
  shares: number
  reach: number
  impressions: number
  engagements: number
}

interface TrendGraphMonitorTileProps {
  title: string
  total: number | undefined
  growth: string | number
  comparisonDays?: string | number
  graphData: FbGraphData30dProps[]
  dataKey: string
  stackId: string
}

const TrendGraphMonitorTile = ({
  title,
  total,
  growth,
  comparisonDays,
  graphData,
  dataKey,
  stackId
}: TrendGraphMonitorTileProps) => {
  console.log(graphData)
  return (
    <Card sx={{ padding: '15px 15px 0 15px', height: '100%', width: '100%', borderRadius: '5px' }}>
      {title && (
        <CardHeader
          title={<TitleCardHeader size='medium'>{title}</TitleCardHeader>}
          action={<TrendGraphMonitorTileAction />}
          sx={{
            padding: 0,
            marginBottom: '20px'
          }}
        />
      )}
      <CardContent sx={{ padding: '0 0 5px 0 !important' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '15px' }}>
          <MetricTotalHeading>{total}</MetricTotalHeading>
          <TrendPercentageIndicator growth={growth} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
          <CustomDescLabel>vs previous {comparisonDays}d</CustomDescLabel>
        </Box>
        <Box sx={{ height: '30px', width: '100%' }}>
          {graphData && (
            <ResponsiveContainer height={50}>
              <AreaChart height={20} data={graphData} margin={{ left: -60 }}>
                <XAxis tick={false} />
                <YAxis tick={false} />
                <Area
                  type='linear'
                  dataKey={dataKey}
                  stackId={stackId}
                  stroke='#4267B2'
                  strokeWidth={2}
                  fill='#4267B2'
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default TrendGraphMonitorTile
