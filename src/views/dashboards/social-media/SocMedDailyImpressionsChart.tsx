// ** React Imports
import React, { useState, useEffect, useCallback } from 'react'

// ** MUI Imports
import { Box, SelectChangeEvent } from '@mui/material'

// ** Data Imports
import { daily, weekly, monthly } from 'src/views/social-media/data/fb'

// ** Custom Component Imports
import ControlledAreaChart from 'src/@core/components/recharts/controlled-area-chart'
import CardControlledSelect from 'src/@core/components/card-controlled-select'
import ChartLegend from 'src/@core/components/chart-legend'
// ** Hook Imports
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'

// ** Type Imports
import { OptionProp, AreaKeyConfig, DailyDataProps } from 'src/views/social-media/types'

const initDayRange: string = '90'

const options: OptionProp[] = [
  { id: '1abcde', value: '90', label: 'last 90 days', title: 'Facebook Daily Likes (90 days)' },
  { id: '2bcdef', value: '60', label: 'last 60 days', title: 'Facebook Daily Likes (60 days)' },
  { id: '3cdefg', value: '30', label: 'last 30 days', title: 'Facebook Daily Likes (30 days)' }
]

const areaKeys: AreaKeyConfig[] = [
  {
    dataKey: 'post_likes',
    type: 'linear',
    stroke: '#4267B2',
    stackId: 'post_likes',
    fill: '#4267B2',
    strokeWidth: 2
  }
]

const SocMedDailyImpressionsChart = () => {
  // **
  const [chartData, setChartData] = useState<DailyDataProps[]>([])
  const [selectedValue, setSelectedValue] = useState<string>(initDayRange)
  const baseColor = '#4267B2'
  // ** Hooks
  const { isSmallScreen, isTablet, isLaptop, isLaptopL, isDesktop } = useDeviceSizesMediaQuery()

  const isOptionProp = (option: OptionProp | undefined): option is OptionProp => {
    return option !== undefined
  }

  const getOptionTitle = (numOfDays: OptionProp[], selectedValue: string): any => {
      const foundOption = numOfDays.find(day => day.value === selectedValue)
      if (!isOptionProp(foundOption)) {
        throw new Error('Error option prop')
      }
      return foundOption.title
  }

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value as string)
  }

  const getAreaChartData = useCallback(() => {
    try {
      if (selectedValue === '90') {
        setChartData(daily.slice(1, 90))
      }
      if (selectedValue === '60') {
        const newData60d = daily.slice(1, 60)
        setChartData(newData60d)
      }
      if (selectedValue === '30') {
        const newData30d = daily.slice(1, 30)
        setChartData(newData30d)
      }
    } catch (error) {
      console.log(error)
    }
  }, [selectedValue])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      getAreaChartData()
    }
    return () => {
      isMounted = false
    }
  }, [selectedValue])

  if(chartData.length !== 0) {
    return (
    <CardControlledSelect
      title={getOptionTitle(options, selectedValue)}
      subtitle='Based on placeholder data'
      handleChange={handleChange}
      options={options}
      selectedValue={selectedValue}
    > 
      <ChartLegend color='#4267B2'>Post Likes</ChartLegend>

      <Box sx={{height: '200px', width: '100%'}}>
        <ControlledAreaChart chartData={chartData} dataKeyXaxis='date' areaKeys={areaKeys} isReferenceLine={true} />
      </Box>
      
    </CardControlledSelect>
  )
  } else {
    return <>Progress</>
  }
}

export default React.memo(SocMedDailyImpressionsChart)
