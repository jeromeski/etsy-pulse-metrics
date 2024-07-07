// ** React Imports
import React, { useState, useEffect, useCallback } from 'react'

// ** MUI Imports
import { Theme, MenuItem, Box, Card, Typography, CardContent, SelectChangeEvent } from '@mui/material'

// ** Icons Imports
import Circle from 'mdi-material-ui/Circle'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

// ** Data Imports
import { SIMPLE_SOCMED_FB_DATA90 } from 'src/views/social-media/data'

// ** Custom Component Imports
import ControlledChartSelect from 'src/@core/components/controlled-chart-select'
import ControlledAreaChart from 'src/@core/components/recharts/controlled-area-chart'
import CardAreaChartHeader from 'src/views/social-media/daily-reach-chart/CardAreaChartHeader'
// import CardAreaChartLegend from 'src/views/social-media/daily-reach-chart/CardAreaChartLegend'
import ChartLegend from 'src/@core/components/chart-legend'

// ** Hook Imports
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'

// ** Type Imports
import { RenderOptionProp, DirectionProps, OptionProp, AreaKeyConfig } from 'src/views/social-media/types'
import CustomHeaderTitleLg from 'src/@core/components/typography/custom-header-title-lg'

const initDayRange: string = '90'

const options3: OptionProp[] = [
  { id: '123abcdef', value: '90', label: 'last 90 days', title: 'Facebook Key Metrics (90 days)' },
  { id: '234bcdefg', value: '60', label: 'last 60 days', title: 'Facebook Key Metrics (60 days)' },
  { id: '345cdefgh', value: '30', label: 'last 30 days', title: 'Facebook Key Metrics (30 days)' }
]

const areaKeys: AreaKeyConfig[] = [
  {
    dataKey: 'date',
    type: 'linear',
    stroke: '#3b5998',
    stackId: 'post_likes',
    fill: '#3b5998',
    strokeWidth: 2
  },
  {
    dataKey: 'date',
    type: 'linear',
    stroke: '#4267B2',
    stackId: 'comments',
    fill: '#4267B2',
    strokeWidth: 2
  },
  {
    dataKey: 'date',
    type: 'linear',
    stroke: '#8b9dc3',
    stackId: 'shares',
    fill: '#8b9dc3',
    strokeWidth: 2
  }
]

const SocMedDailyImpressionsChart = () => {
  // ** States
  const [chartData, setChartData] = useState<any[]>([])
  const [selectedValue, setSelectedValue] = useState<string>(initDayRange)
  // ** Hooks
  const { isMobileXs, isMobileS, isMobileM, isTablet, isLaptop, isLaptopL, isDesktop } = useDeviceSizesMediaQuery()

  const getOptionTitle = (numOfDays: OptionProp[], selectedValue: string): string | undefined => {
    const foundOption = numOfDays.find(day => day.value === selectedValue)
    return foundOption ? foundOption.title : undefined
  }

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value as string)
  }

  const getAreaChartData = useCallback(() => {
    try {
      if (selectedValue === '90') {
        setChartData(SIMPLE_SOCMED_FB_DATA90)
      }
      if (selectedValue === '60') {
        const newData60d = SIMPLE_SOCMED_FB_DATA90.slice(0, 9)
        setChartData(newData60d)
      }
      if (selectedValue === '30') {
        const newData30d = SIMPLE_SOCMED_FB_DATA90.slice(0, 5)
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

  return (
    <Card sx={{ maxWidth: '100%', padding: '1rem 1.5rem' }}>
      <CardAreaChartHeader>
        <Box
          sx={(theme: Theme) => ({
            marginBottom: '1rem'
          })}
        >
          <CustomHeaderTitleLg>{getOptionTitle(options3, selectedValue)}</CustomHeaderTitleLg>
        </Box>
        <Box>
          <ControlledChartSelect
            placeholder='Select Option...'
            onChange={handleChange}
            options={options3}
            value={selectedValue}
            renderOptions={(options: RenderOptionProp[]) =>
              options.map(option => (
                <MenuItem key={option.id} value={option.value}>
                  <CalendarTodayIcon
                    sx={(theme: Theme) => ({
                      marginRight: '1rem',
                      fontSize: '1rem',
                      [theme.breakpoints.up('md')]: {
                        fontSize: '1.25rem'
                      }
                    })}
                  />
                  {option.label}
                </MenuItem>
              ))
            }
          />
        </Box>
      </CardAreaChartHeader>
      <CardContent>
        {/* Chart Legend */}
        <Box sx={{ display: 'flex' }}>
          <ChartLegend color='#3b5998'>Likes</ChartLegend>
          <ChartLegend color='#4267B2'>Comments</ChartLegend>
          <ChartLegend color='#8b9dc3'>Shares</ChartLegend>
        </Box>
        {/* Chart Area */}
        <ControlledAreaChart
          chartData={chartData}
          direction='ltr'
          dataKeyXaxis='date'
          areaKeys={areaKeys}
          tickCount={4}
          orientation='left'
        />
      </CardContent>
    </Card>
  )
}

export default React.memo(SocMedDailyImpressionsChart)
