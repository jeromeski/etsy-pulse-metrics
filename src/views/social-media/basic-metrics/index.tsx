// **React Imports
import React, { useState, useEffect } from 'react'

// **Mui Imports
import { Grid } from '@mui/material'

// **Custom Components Imports
import BasicMetricsCardItem from 'src/views/social-media/basic-metrics/BasicMetricsCardItem'

// **Hooks Imports
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'

// **Data Imports
import { SIMPLE_SOCMED_CARD_METRICS } from 'src/data'

// **Type Imports
interface SocMedMetricsItem {
  id: string
  title: string
  keyMetricValue: string
  growth: string
  likesComparisonDays: string
  iconURL: string
}

const SocMedMetricsContainer = () => {
  const [metricsData, setMetricsData] = useState<SocMedMetricsItem[] | null>(null)
  const { isMobileXs, isMobileS, isMobileM, isTablet, isLaptopS, isLaptopL, isDesktop } = useDeviceSizesMediaQuery()
  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      try {
        if (SIMPLE_SOCMED_CARD_METRICS) {
          setMetricsData(SIMPLE_SOCMED_CARD_METRICS)
        }
      } catch (error) {
        console.log(error)
      }
    }
    return () => {
      isMounted = false
    }
  }, [])
  return (
    <Grid container>
      {metricsData?.map((item: SocMedMetricsItem) => (
        <Grid item key={item.id} xs={isMobileXs || isMobileS ? 12 : 6} sm={isMobileM ? 6 : 4} md={3} lg={2}>
          <BasicMetricsCardItem
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
