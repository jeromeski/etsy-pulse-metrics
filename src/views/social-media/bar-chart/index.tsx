// ** React Imports
import React, { useState, useEffect, useCallback } from 'react'

// ** Third Party Imports
import { format } from 'date-fns'

//  **Mui Imports
import { Box, CircularProgress } from '@mui/material'

// **Custom Components
import ChartLegend from 'src/@core/components/chart-legend'
import ControlledBarChart from 'src/@core/components/recharts/controlled-hor-bar-chart'
import SocMedSharedCard from 'src/views/social-media/shared-card'

// ** Utils Import
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'
import fakeFetch from 'src/@core/utils/fakeFetch'

// **Data Imports
import { daily, weekly, monthly } from 'src/views/social-media/data/fb'

// **Type Imports
import { DailyDataProps, DataProps } from 'src/views/social-media/types'

const SocialMediaBarChart = () => {
  const { isSmallScreen, isTablet, isLaptop, isLaptopL, isDesktop } = useDeviceSizesMediaQuery()
  const [chartData, setChartData] = useState<DailyDataProps[]>([])
  const [title, setTitle] = useState<string>('Likes, Comments and Shares (30 days)')
  const [direction, setDirection] = useState<string>('ltr')
  const [isLoading, setIsLoading] = useState<boolean | null>(null)

  const barKeys = [
    { dataKey: 'post_likes', fill: '#3b5998' },
    { dataKey: 'comments', fill: '#4267B2' },
    { dataKey: 'shares', fill: '#8b9dc3' }
  ]

  const formatXAxis = (tickItem: any) => {
    const newFormat = format(new Date(tickItem), 'MMM d')
    return newFormat
  }

  const getChartData = useCallback(async days => {
    fakeFetch(setIsLoading)

    const newData: DailyDataProps[] = await new Promise((resolve, reject) => {
      const data: DailyDataProps[] = daily.slice(0, days)
      try {
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
    setChartData(newData)
  }, [])

  useEffect(() => {
    let isMounted = true
    try {
      getChartData(30)
    } catch (error) {
      console.log(error)
    }
    return () => {
      isMounted = false
    }
  }, [daily])

  if (chartData.length !== 0) {
    return (
      <SocMedSharedCard title={title}>
        <Box sx={{ height: '250px' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: isSmallScreen ? 'flex-start' : 'flex-end',
              marginBottom: '10px'
            }}
          >
            <ChartLegend color='#3b5998'>Likes</ChartLegend>
            <ChartLegend color='#4267B2'>Comments</ChartLegend>
            <ChartLegend color='#8b9dc3'>Shares</ChartLegend>
          </Box>
          <ControlledBarChart
            data={chartData}
            barKeys={barKeys}
            formatXAxis={formatXAxis}
            direction={direction}
            isReferenceLine={true}
          />
        </Box>
      </SocMedSharedCard>
    )
  } else {
    return (
      <>
        <CircularProgress />
      </>
    )
  }
}

export default SocialMediaBarChart
