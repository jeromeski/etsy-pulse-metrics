// ** React Imports
import { forwardRef, useState, MouseEventHandler, MouseEvent, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import { styled } from '@mui/material/styles'

import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

// ** Third Party Imports
import { format } from 'date-fns'
import {
  AreaChart,
  Legend,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps
} from 'recharts'

// ** Icons Imports
import Circle from 'mdi-material-ui/Circle'
import BellOutline from 'mdi-material-ui/BellOutline'
import ChevronDown from 'mdi-material-ui/ChevronDown'

// ** Types
type DateType = Date | null | undefined

// import { DateType } from "src/types/forms/reactDatepickerTypes";
import { SIMPLE_SOCMED_FB_DATA_90 } from '@/data'
import { darken } from '@mui/system'

interface Props {
  direction: 'ltr' | 'rtl'
}

interface PickerProps {
  start: Date | number | null | undefined
  end: Date | number | null | undefined
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

const StyledSelect = styled(Select)({
  marginRight: '.45rem !important',
  marginTop: '.5rem !important',
  height: '2rem',
  '& div': {
    display: 'flex',
    alignItems: 'center'
  }
})

const BasicLineAreaChart = ({ direction }: Props) => {
  // ** States
  const [endDate, setEndDate] = useState<DateType>(null)
  const [startDate, setStartDate] = useState<DateType>(new Date())
  const [chartData, setChartData] = useState<any[]>([])
  const [dayRange, setDayRange] = useState('90')

  const handleChange: any = (event: any) => {
    console.log(event.target.value)
    if (event && event.target) {
      setDayRange(event.target.value)
    }
  }

  useEffect(() => {
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

    console.log(chartData)
  }, [dayRange])

  return (
    <Card sx={{ width: '40rem' }}>
      <CardHeader
        title={`Facebook Daily Reach (${dayRange} days)`}
        titleTypographyProps={{ variant: 'h4' }}
        sx={theme => ({
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { marginBottom: 0 },
          '& .MuiCardHeader-content': { marginBottom: [2, 0] },
          '& .MuiCardHeader-title	': {
            color: `${darken(theme.palette.grey[900], 0.5)}`,
            fontWeight: '700',
            fontSize: '1.25rem !important'
          }
        })}
        action={
          <StyledSelect value={dayRange} onChange={handleChange} displayEmpty>
            <MenuItem value='90'>
              <CalendarTodayIcon sx={{ marginRight: '1rem' }} />
              Last 90 days
            </MenuItem>
            <MenuItem value='60'>
              {' '}
              <CalendarTodayIcon sx={{ marginRight: '1rem' }} />
              Last 60 days
            </MenuItem>
            <MenuItem value='30'>
              {' '}
              <CalendarTodayIcon sx={{ marginRight: '1rem' }} />
              Last 30 days
            </MenuItem>
            {/* Add more menu items as needed */}
          </StyledSelect>
        }
      />
      <CardContent>
        <Box sx={{ display: 'flex', marginBottom: 1 }}>
          <Box sx={{ marginRight: 4, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Circle sx={{ marginRight: 1, fontSize: '1.25rem', color: 'rgb(0,51,187, .75)' }} />
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
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer>
            <AreaChart height={350} data={chartData} style={{ direction }} margin={{ left: -20 }}>
              <CartesianGrid />
              <XAxis dataKey='date' reversed={direction === 'rtl'} />
              <YAxis orientation={direction === 'rtl' ? 'right' : 'left'} />
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

export default BasicLineAreaChart
