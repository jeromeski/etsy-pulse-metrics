// **React Imports
import React, { useState, useEffect } from 'react'

// **Mui Imports
import { Box } from '@mui/material'

// **Custom Components Imports
import BasicMetricsCardItem from 'src/views/social-media/basic-metrics/BasicMetricsCardItem'

// **Hooks Imports
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'

// **Data Imports
import { SIMPLE_SOCMED_CARD_METRICS } from 'src/views/social-media/data'

// **Type Imports
import { SocMedMetricsItem } from 'src/views/social-media/types'

const SocMedBasicMetrics = () => {
  const [metricsData, setMetricsData] = useState<SocMedMetricsItem[] | null>(null)

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
    <Box
      sx={theme => ({
        display: 'flex',
        flexWrap: 'wrap',
        justifycontent: 'space-between',
        gap: '10px'
      })}
    >
      {metricsData?.map((item: SocMedMetricsItem) => (
        <BasicMetricsCardItem
          key={item.id}
          title={item.title}
          keyMetricValue={item.keyMetricValue}
          growth={item.growth}
          likesComparisonDays={item.likesComparisonDays}
        />
      ))}
    </Box>
  )
}

export default React.memo(SocMedBasicMetrics)
