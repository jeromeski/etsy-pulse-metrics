// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'

// ** Icons Imports
import Circle from 'mdi-material-ui/Circle'
import BellOutline from 'mdi-material-ui/BellOutline'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'

// ** Types
type DateType = any

interface Props {
  direction: 'ltr' | 'rtl'
}

interface PickerProps {
  start: Date | number
  end: Date | number
}

const data = [
  {
    name: '7/12',
    Apple: 80,
    Samsung: 130,
    Oneplus: 150,
    Motorola: 210
  },
  {
    name: '8/12',
    Apple: 100,
    Samsung: 150,
    Oneplus: 170,
    Motorola: 380
  },
  {
    name: '9/12',
    Apple: 80,
    Samsung: 140,
    Oneplus: 160,
    Motorola: 220
  },
  {
    name: '10/12',
    Apple: 100,
    Samsung: 150,
    Oneplus: 170,
    Motorola: 380
  },
  {
    name: '11/12',
    Apple: 50,
    Samsung: 90,
    Oneplus: 110,
    Motorola: 150
  },
  {
    name: '12/12',
    Apple: 125,
    Samsung: 90,
    Oneplus: 100,
    Motorola: 65
  },
  {
    name: '13/12',
    Apple: 70,
    Samsung: 110,
    Oneplus: 130,
    Motorola: 210
  },
  {
    name: '14/12',
    Apple: 100,
    Samsung: 150,
    Oneplus: 170,
    Motorola: 380
  },
  {
    name: '15/12',
    Apple: 80,
    Samsung: 100,
    Oneplus: 120,
    Motorola: 180
  },
  {
    name: '16/12',
    Apple: 30,
    Samsung: 60,
    Oneplus: 70,
    Motorola: 110
  }
]

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

const RechartsBarChart = ({ direction }: Props) => {
  // ** States
  const [endDate, setEndDate] = useState<DateType>(null)
  const [startDate, setStartDate] = useState<DateType>(new Date())
  const { isMobileXs, isMobileS, isMobileM, isMobileL, isTablet, isLaptop, isLaptopL, isDesktop } =
    useDeviceSizesMediaQuery()

  const CustomInput = forwardRef((props: PickerProps, ref) => {
    const startDate = format(props.start, 'dd/MM/yyyy')
    const endDate = props.end !== null ? ` - ${format(props.end, 'dd/MM/yyyy')}` : null

    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return (
      <TextField
        {...props}
        size='small'
        value={value}
        inputRef={ref}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <BellOutline />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <ChevronDown />
            </InputAdornment>
          )
        }}
      />
    )
  })

  const handleOnChange = (dates: any) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <Card sx={{ width: '100%', height: 'auto' }}>
      <CardHeader
        title='Monthly Engagement Metrics'
        titleTypographyProps={{ variant: 'h6' }}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { marginBottom: 0 },
          '& .MuiCardHeader-content': { marginBottom: [2, 0] }
        }}
      />
      <CardContent sx={{ height: '100%', width: 'max-content' }}>
        <Box
          sx={{
            mb: 4,
            display: 'flex',
            flexWrap: 'wrap'
          }}
        >
          <Box sx={{ marginRight: 6, display: 'flex', alignItems: 'center' }}>
            <Circle sx={{ marginRight: 1.5, fontSize: '0.75rem', color: '#3b5998' }} />
            <Typography>Likes</Typography>
          </Box>
          <Box sx={{ marginRight: 6, display: 'flex', alignItems: 'center' }}>
            <Circle sx={{ marginRight: 1.5, fontSize: '0.75rem', color: '#4267B2' }} />
            <Typography>Comments</Typography>
          </Box>
          <Box sx={{ marginRight: 6, display: 'flex', alignItems: 'center' }}>
            <Circle sx={{ marginRight: 1.5, fontSize: '0.75rem', color: '#8b9dc3' }} />
            <Typography>Shares</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            height: {
              xs: 150,
              sm: 200
            },
            width: '100%'
          }}
        >
          <ResponsiveContainer height='100%' width='100%'>
            <BarChart data={data} barSize={15} style={{ direction }} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' reversed={direction === 'rtl'} />
              <YAxis orientation={direction === 'rtl' ? 'right' : 'left'} />
              <Tooltip content={CustomTooltip} />
              <Bar dataKey='Apple' fill='#3b5998' />
              <Bar dataKey='Samsung' fill='#4267B2' />
              <Bar dataKey='Oneplus' fill='#8b9dc3' />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

export default RechartsBarChart
