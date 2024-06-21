// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import { useMediaQuery, Theme } from '@mui/material'

import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

// ** Third Party Imports
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'

// ** Icons Imports
import Circle from 'mdi-material-ui/Circle'

// ** Data Imports
import { SIMPLE_SOCMED_FB_DATA_90 } from 'src/data'

// ** Custom Component Imports
import ControlledChartAxisTick from 'src/@core/components/controlled-chart-axis-tick'

// ** Hooks
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'

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

const StyledSelect = styled(Select)(({ theme }: { theme: Theme }) => ({
  fontSize: '.9rem',
  marginRight: '.45rem !important',
  height: '2rem',
  '& div': {
    display: 'flex',
    alignItems: 'center'
  },
  [theme.breakpoints.up('sm')]: {
    // marginLeft: '.25rem'
    marginTop: 0,
    paddingTop: 0
  }
}))

const initDayRange: string = '90'

const BasicSocMedAreaChart = ({ direction }: Props) => {
  // ** States
  const [chartData, setChartData] = useState<any[]>([])
  const [dayRange, setDayRange] = useState<string>(initDayRange)
  // ** Hooks
  const {
    isXtraSmallScreen,
    isSmallScreen,
    isMediumScreen,
    isTabletScreen,
    isSmallLaptopScreen,
    isLaptopScreen,
    isDesktopScreen
  } = useDeviceSizesMediaQuery()

  const handleChange: any = (event: any) => {
    console.log(event.target.value)
    if (event && event.target) {
      setDayRange(event.target.value)
    }
  }

  const getAreaChartData = useCallback(() => {
    try {
      if (dayRange === '90') {
        console.log('useEffect fired!')
        setChartData(SIMPLE_SOCMED_FB_DATA_90)
      }
      if (dayRange === '60') {
        const newData60d = SIMPLE_SOCMED_FB_DATA_90.slice(0, 9)
        setChartData(newData60d)
      }
      if (dayRange === '30') {
        const newData30d = SIMPLE_SOCMED_FB_DATA_90.slice(0, 5)
        setChartData(newData30d)
      }
    } catch (error) {
      console.log(error)
    }
  }, [dayRange])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      getAreaChartData()
    }
    return () => {
      isMounted = false
    }
  }, [dayRange])

  return (
    <Card sx={{ margin: '1rem', maxWidth: '700px' }}>
      <CardHeader
        title={
          dayRange === '90'
            ? 'Facebook Daily Reach (90 days)'
            : dayRange === '60'
            ? 'Facebook Daily Reach (60 days)'
            : 'Facebook Daily Reach (30 days)'
        }
        titleTypographyProps={{ variant: 'h4' }}
        action={
          <StyledSelect value={dayRange} onChange={handleChange} displayEmpty>
            <MenuItem value='90'>
              <CalendarTodayIcon
                sx={{
                  marginRight: '1rem',
                  fontSize: isXtraSmallScreen || isSmallScreen ? '1rem' : '1.25rem'
                }}
              />
              Last 90 days
            </MenuItem>
            <MenuItem value='60'>
              {' '}
              <CalendarTodayIcon
                sx={{ marginRight: '1rem', fontSize: isXtraSmallScreen || isSmallScreen ? '1rem' : '1.25rem' }}
              />
              Last 60 days
            </MenuItem>
            <MenuItem value='30'>
              {' '}
              <CalendarTodayIcon
                sx={{ marginRight: '1rem', fontSize: isXtraSmallScreen || isSmallScreen ? '1rem' : '1.25rem' }}
              />
              Last 30 days
            </MenuItem>
            {/* Add more menu items as needed */}
          </StyledSelect>
        }
        sx={(theme: Theme) => ({
          paddingBottom: 0,
          flexDirection: isXtraSmallScreen || isSmallScreen || isMediumScreen ? 'column' : 'row',
          alignItems: isTabletScreen || isLaptopScreen || isDesktopScreen ? 'flex-end' : 'flex-start',
          // alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': {
            marginTop: isMediumScreen || isTabletScreen || isLaptopScreen || isDesktopScreen ? 0 : '.1rem',
            marginBottom: isMediumScreen || isTabletScreen || isLaptopScreen || isDesktopScreen ? 0 : '.5rem',
            paddingTop: isMediumScreen || isTabletScreen || isLaptopScreen || isDesktopScreen ? 0 : '.5rem',
            backgroundColor: 'lightblue'
          },
          '& .MuiCardHeader-content': {
            marginBottom: [1, 0],
            paddingBottom: 0,
            display: 'flex',
            flexDirection: isXtraSmallScreen || isSmallScreen || isMediumScreen ? 'column' : 'row',
            alignItems: isTabletScreen || isLaptopScreen || isDesktopScreen ? 'flex-end' : 'flex-start'
          },
          '& .MuiCardHeader-content > .MuiCardHeader-title	': {
            color: theme.palette.grey['A400'],
            fontWeight: '700',
            fontSize: isXtraSmallScreen || isSmallScreen || isMediumScreen ? '.9rem' : '1rem',
            marginBottom: isXtraSmallScreen || isSmallScreen || isMediumScreen ? 0 : '.5rem'
          }
        })}
      />
      <CardContent>
        {/* Reach */}
        <Box
          sx={{
            marginRight: 4,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isXtraSmallScreen || isSmallScreen || isMediumScreen ? 'flex-end' : 'flex-start',
            marginBottom: '1rem'
          }}
        >
          <Circle
            sx={{
              marginRight: 1,
              fontSize: isXtraSmallScreen || isSmallScreen ? '1rem' : '1.25rem',
              color: 'rgb(0,51,187, .75)'
            }}
          />
          <Typography
            variant='body1'
            sx={theme => ({
              color: theme.palette.grey['A400'],
              fontWeight: '700',
              fontSize: isXtraSmallScreen || isSmallScreen || isMediumScreen ? '.9rem' : '1rem'
            })}
          >
            Reach
          </Typography>
        </Box>
        {/* Area Chart */}
        <Box sx={{ height: '250px', width: '100%' }}>
          <ResponsiveContainer height='100%' width='100%'>
            <AreaChart height={350} data={chartData} style={{ direction }} margin={{ left: -20 }}>
              <CartesianGrid />
              <XAxis
                dataKey='date'
                reversed={direction === 'rtl'}
                tickCount={isLaptopScreen ? 9 : isMediumScreen ? 7 : 3}
                tick={props => {
                  return <ControlledChartAxisTick x={props.x} y={props.y} payload={props.payload} rotation={-45} />
                }}
              />
              <YAxis
                tickCount={4}
                orientation={direction === 'rtl' ? 'right' : 'left'}
                style={{ fontSize: isXtraSmallScreen ? '.8rem' : isSmallScreen ? '.9rem' : '1rem' }}
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
      </CardContent>
    </Card>
  )
}

export default BasicSocMedAreaChart
