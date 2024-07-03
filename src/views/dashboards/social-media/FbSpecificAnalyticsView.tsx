// **React Imports
import { useEffect, useState } from 'react'

// **Vendor Imports
import { useLogger } from 'react-use'

import TrendGraphMonitorTile from 'src/views/social-media/basic-metrics/TrendGraphMonitorTile'
// **Data Imports
import { SIMPLE_SOCMED_CARD_METRICS, SIMPLE_SOCMED_FB_DATA90 } from 'src/views/social-media/data'
import useAggregateValues from 'src/hooks/social-media/useAggregateTotals'
import useGrowthTrend from 'src/hooks/social-media/useGrowthTrend'

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
  // useLogger('FbSpecificAnalyticsView')
  const [metrics, setMetrics] = useState<FbMetrics30dProps[] | []>([])
  const [graphData, setGraphData] = useState<FbGraphData30dProps[] | []>([])
  const [total, setTotal] = useState<number>(0)
  const { getTotalValue, isLoading, totalValues, slicedData } = useAggregateValues()
  const { trendValues, getGrowthTrend } = useGrowthTrend()

  useEffect(() => {
    let isMounted = true
    try{
      getTotalValue()
      getGrowthTrend()
    }catch(error){}
  },[])

  useEffect(() => {
    // console.log(`slicedData: ${slicedData}`, `totalValues: ${totalValues}`, `trendValue: ${trendValues}`)
    console.log(trendValues)
  },[slicedData, totalValues, trendValues])
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
