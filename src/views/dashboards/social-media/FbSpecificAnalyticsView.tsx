// **React Imports
import { useEffect, useState } from 'react'

import { Box } from '@mui/material'
import TrendGraphMonitorTile from 'src/views/social-media/basic-metrics/TrendGraphMonitorTile'
// **Data Imports
import { SIMPLE_SOCMED_CARD_METRICS, SIMPLE_SOCMED_FB_DATA90 } from 'src/views/social-media/data'

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

const FbSpecificAnalyticsView = () => {
  const [metrics, setMetrics] = useState<FbMetrics30dProps[] | []>([])
  const [graphData, setGraphData] = useState<FbGraphData30dProps[] | []>([])
  const [total, setTotal] = useState<number>(0)
  useEffect(() => {
    try {
      if (SIMPLE_SOCMED_CARD_METRICS && SIMPLE_SOCMED_FB_DATA90) {
        const fbMetrics30d: FbMetrics30dProps[] = SIMPLE_SOCMED_CARD_METRICS.slice(0, 1)
        const fbGraphData30d: FbGraphData30dProps[] = SIMPLE_SOCMED_FB_DATA90.slice(0, 30)
        new Promise<number>((resolve, reject) => {
          const total = fbGraphData30d.reduce((acc, currentVal) => acc + currentVal.postLikes, 0)
          resolve(total)
        }).then(total => {
          if (total) setTotal(total)
        })

        setMetrics(fbMetrics30d)
        setGraphData(fbGraphData30d)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])
  if (metrics) {
    return (
      <TrendGraphMonitorTile
        title='Likes'
        growth={metrics[0]?.growth}
        graphData={graphData}
        stackId='date'
        dataKey='postLikes'
        comparisonDays={30}
        total={total}
      />
    )
  }
  return <></>
}

export default FbSpecificAnalyticsView
