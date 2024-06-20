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

// import { DateType } from "src/types/forms/reactDatepickerTypes";
import { SIMPLE_SOCMED_FB_DATA_90 } from '@/data'
import { darken } from '@mui/system'

interface Props {
  direction: 'ltr' | 'rtl'
}
interface CustomXAxisTickProps {
  x: number
  y: number
  payload: {
    value: string
  }
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

const CustomXAxisTick = ({ x, y, payload }: CustomXAxisTickProps) => {
  // Determine the rotation angle (e.g., 270 degrees for vertical labels)
  const rotation = -45
  const cx = x
  const cy = y

  return (
    <text x={cx} y={cy} transform={`rotate(${rotation} ${cx} ${cy} )`} textAnchor='middle'>
      {payload.value}
    </text>
  )
}

const StyledSelect = styled(Select)(({ theme }: { theme: Theme }) => ({
  marginRight: '.45rem !important',
  marginTop: '.5rem !important',
  height: '2rem',
  '& div': {
    display: 'flex',
    alignItems: 'center'
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    // marginLeft: '.25rem'
  }
}))

const initDayRange: string = '90'

const StyledCardHeader = styled(CardHeader)(({ theme }: { theme: Theme }) => ({
  paddingBottom: 0,
  flexDirection: 'column',
  alignItems: 'flex-start',

  // alignItems: ['flex-start', 'center'],
  '& .MuiCardHeader-action': { marginBottom: 0 },
  '& .MuiCardHeader-content': {
    marginBottom: [1, 0],
    paddingBottom: 0,
    display: 'flex'
  },
  '& .MuiCardHeader-content > .MuiCardHeader-title	': {
    color: `${darken(theme.palette.grey[900], 0.5)}`,
    fontWeight: '700',
    fontSize: '1rem !important',
    marginBottom: '.5rem'
  }
}))

const BasicSocMedAreaChart = ({ direction }: Props) => {
  // ** States
  const [chartData, setChartData] = useState<any[]>([])
  const [dayRange, setDayRange] = useState<string>(initDayRange)

  const isLargeScreen = useMediaQuery('min-width: 1200px')
  const isMediumScreen = useMediaQuery('min-width: 900px')
  const isSmallScreen = useMediaQuery('(min-width: 376px) and (max-width: 600px)')
  const isXtraSmallScreen = useMediaQuery('(min-width: 0) and (max-width: 375px)')

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
      <StyledCardHeader
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
      />
      <CardContent>
        <Box>
          <Box
            sx={{
              marginRight: 4,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
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
                color: `${darken(theme.palette.grey[900], 0.5)}`,
                fontWeight: '700',
                fontSize: '1rem !important'
              })}
            >
              Reach
            </Typography>
          </Box>
        </Box>
        <Box sx={{ height: '250px', width: '100%' }}>
          <ResponsiveContainer height='100%' width='100%'>
            <AreaChart height={350} data={chartData} style={{ direction }} margin={{ left: -20 }}>
              <CartesianGrid />
              <XAxis
                dataKey='date'
                reversed={direction === 'rtl'}
                tickCount={isLargeScreen ? 9 : isMediumScreen ? 7 : 5}
                tick={props => {
                  console.log(props)
                  return <CustomXAxisTick x={props.x} y={props.y} payload={props.payload} />
                }}
              />
              <YAxis tickCount={4} orientation={direction === 'rtl' ? 'right' : 'left'} />
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
