// ** React Imports
import React, { useState, useEffect, useCallback } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import { Theme, Select, MenuItem, Box, Card, Divider, Typography, CardContent, SelectChangeEvent } from '@mui/material'

// ** Third Party Imports
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'

// ** Icons Imports
import Circle from 'mdi-material-ui/Circle'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

// ** Data Imports
import { SIMPLE_SOCMED_FB_DATA_90 } from 'src/data'

// ** Custom Component Imports
import ControlledChartAxisTick from 'src/@core/components/controlled-chart-axis-tick'

// ** Hooks
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'
import ControlledChartSelect from 'src/@core/components/controlled-chart-select'
import ControlledAreaChart from '../charts/controlled-area-chart'

interface RenderOptionProp {
  id?: string
  value: string
  label: string
}

type RenderProp = (options: RenderOptionProp[]) => React.ReactNode

interface Props {
  direction: 'ltr' | 'rtl'
}

const CustomTooltip = (data: TooltipProps<any, any>) => {
  const { active, payload } = data

  if (active && payload) {
    return (
      <div className='recharts-custom-tooltip'>
        <Typography>{data.label}</Typography>
        <Divider />
        {data &&
          data.payload &&
          data.payload.map((i: any) => {
            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }} key={i.dataKey}>
                <Circle sx={{ color: i.fill, marginRight: 2.5, fontSize: '0.6rem' }} />
                <span>
                  {i.dataKey} : {i.payload[i.dataKey]}
                </span>
              </Box>
            )
          })}
      </div>
    )
  }

  return null
}

const CardAreaChartSelect = styled(Select)(({ theme }: { theme: Theme }) => ({
  fontSize: '.9rem',
  marginRight: '.45rem',
  height: '2rem',
  '& div': {
    display: 'flex',
    alignItems: 'center'
  },
  [theme.breakpoints.between('sm', 'lg')]: {
    marginRight: 0
  }
}))

const CardAreaChartLegend = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginBottom: '.5rem'
}))

const CardAreaChartHeader = styled(Box)(({ theme }: { theme: Theme }) => ({
  padding: '1rem 1.5rem 0 1.5rem',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.between('sm', 'xl')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))

const initDayRange: string = '90'

const options: OptionProp[] = [
  { id: '1abcde', value: '90', label: 'last 90 days', title: 'Facebook Daily Reach (90 days)' },
  { id: '2bcdef', value: '60', label: 'last 60 days', title: 'Facebook Daily Reach (60 days)' },
  { id: '3cdefg', value: '30', label: 'last 30 days', title: 'Facebook Daily Reach (30 days)' }
]

type OptionProp = {
  id?: string
  value: string
  label: string
  title: string
}

const BasicSocMedAreaChart = ({ direction }: Props) => {
  // ** States
  const [chartData, setChartData] = useState<any[]>([])
  const [selectedValue, setSelectedValue] = useState<string>(initDayRange)
  // ** Hooks
  const { isMobileXs, isMobileS, isMobileM, isTablet, isLaptopS, isLaptopL, isDesktop } = useDeviceSizesMediaQuery()

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
        setChartData(SIMPLE_SOCMED_FB_DATA_90)
      }
      if (selectedValue === '60') {
        const newData60d = SIMPLE_SOCMED_FB_DATA_90.slice(0, 9)
        setChartData(newData60d)
      }
      if (selectedValue === '30') {
        const newData30d = SIMPLE_SOCMED_FB_DATA_90.slice(0, 5)
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
    <Card sx={{ margin: '1rem', maxWidth: '700px' }}>
      <CardAreaChartHeader>
        <Box
          sx={(theme: Theme) => ({
            marginBottom: '1rem'
          })}
        >
          <Typography
            variant='h1'
            sx={(theme: Theme) => ({
              fontSize: {
                xs: '.95rem',
                sm: '1rem',
                md: '1.10rem',
                lg: '1.15rem'
              },
              fontWeight: '700',
              letterSpacing: '.2px'
            })}
          >
            {getOptionTitle(options, selectedValue)}
          </Typography>
        </Box>
        <Box>
          <ControlledChartSelect
            placeholder='Select Option...'
            onChange={handleChange}
            options={options}
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
        <CardAreaChartLegend>
          <Circle
            sx={(theme: Theme) => ({
              color: theme.palette.primary.main,
              height: 'auto',
              width: '15px',
              marginRight: '5px'
            })}
          />
          <Typography
            variant='body1'
            sx={(theme: Theme) => ({
              fontSize: '.9rem'
            })}
          >
            <b>Reach</b>
          </Typography>
        </CardAreaChartLegend>
        {/* Chart Area */}
        <ControlledAreaChart
          chartData={chartData}
          direction={direction === 'rtl'}
          dataKeyXaxis='date'
          orientation={direction === 'rtl' ? 'right' : 'left'}
          dataKeyArea='reach'
          stackId='reach'
          type='linear'
          tickCount={4}
          stroke='#003bb3'
          strokeWidth='3'
          fill='rgb(0,51,187)'
        />
      </CardContent>
    </Card>
  )
}

export default BasicSocMedAreaChart

/*
<Box sx={{ height: '250px', width: '100%' }}>
          <ResponsiveContainer height='100%' width='100%'>
            <AreaChart height={350} data={chartData} style={{ direction }} margin={{ left: -20 }}>
              <CartesianGrid />
              <XAxis
                dataKey='date'
                reversed={direction === 'rtl'}
                tickCount={isLaptopS ? 9 : isTablet ? 7 : 3}
                tick={props => {
                  return <ControlledChartAxisTick x={props.x} y={props.y} payload={props.payload} rotation={-45} />
                }}
                style={{
                  fontSize: isMobileXs || isMobileS || isMobileM || isTablet ? '.9rem' : '1rem'
                }}
              />
              <YAxis
                tickCount={4}
                orientation={direction === 'rtl' ? 'right' : 'left'}
                style={{
                  fontSize: isMobileXs || isMobileS || isMobileM || isTablet ? '.9rem' : '1rem'
                }}
              />
              <Tooltip content={CustomTooltip} />
              <Area
                type='linear'
                dataKey='reach'
                stackId='reach'
                stroke='#003bb3'
                strokeWidth='3'
                fill='rgb(0,51,187)'
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
*/
