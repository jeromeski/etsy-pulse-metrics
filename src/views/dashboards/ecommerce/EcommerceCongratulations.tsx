import { useState, useEffect } from 'react'
import getConfig from 'next/config'
import axios from 'axios'
import moment from 'moment'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid, { GridProps } from '@mui/material/Grid'

import { _t } from '../../../configs/lang/translation'

// import { sizing } from '@mui/system'

const { publicRuntimeConfig } = getConfig()

// Styled Grid component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    order: -1,
    display: 'flex',
    justifyContent: 'center'
  }
}))

// Styled component for the image
const Img = styled('img')(({ theme }) => ({
  right: 13,
  bottom: 0,
  height: 185,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    height: 165,
    position: 'static'
  }
}))

const EcommerceCongratulations = () => {
  const [firstname, setFirstname] = useState<string | null>('')
  const [currentYearGrowth, setCurrentYearGrowth] = useState<number>(0)
  const [currentMonthGrowth, setCurrentMonthGrowth] = useState<number>(0)
  const [weeklyProjectedAmount, setWeeklyProjectedAmount] = useState<number>(0)

  const transformData = (rawData: any): any => {
    // Get all keys ['January', 'February', ...]
    const months = Object.keys(rawData)

    // Remap data and reduce each day total_booking, total_amount into single month
    const transformedData = months.map(month => {
      return {
        month: month,
        totalBooking: Object.values(rawData[month]).reduce((previousValue: number, currentDay: any) => {
          return previousValue + currentDay.total_booking
        }, 0),
        totalAmount: Object.values(rawData[month]).reduce((previousValue: number, currentDay: any) => {
          return previousValue + currentDay.total_amount
        }, 0)
      }
    })
    let wholeYearTotal = 0
    transformedData.map(data => (wholeYearTotal += data.totalAmount))

    return { transformedData, wholeYearTotal }
  }

  const getMonthData = (yearData: any, month: string) => {
    return yearData.find((data: any) => data.month === month)
  }

  const getMonthlyAmountData = (object: any, value: string) => {
    return {
      [value]: Object.entries(object[value]).map(e => ({ data: e[1] }))
    }
  }

  const getWeeklyAmount = (currentMonthData: any, currentMonth: string) => {
    const startDay: number = +moment().isoWeekday(1).format('D') // Monday
    const lastDay: number = +moment().isoWeekday(7).format('D') // Sunday
    let currentWeekTotalAmount = 0

    for (let x: number = startDay; x >= startDay && x <= lastDay; x++) {
      currentWeekTotalAmount += currentMonthData[currentMonth][x - 1].data?.total_amount
    }

    return currentWeekTotalAmount
  }

  useEffect(() => {
    const userData = window.localStorage.getItem('userData')
    if (userData) {
      const userObj = JSON.parse(userData)
      const { firstname } = userObj
      setFirstname(firstname)
    }

    const fetchApi = async () => {
      const serverUrl = publicRuntimeConfig.backendUrl
      const endPoint = `${serverUrl}/api/dashboard-stat/yearly-growth`
      axios
        .get(endPoint)
        .then(res => {
          // get data from endpoint
          const { currentYearGrowth, previousYearGrowth } = res.data

          // transform data into iterable array and get total year amount
          const { transformedData: currentYearData, wholeYearTotal: currentYearTotal } =
            transformData(currentYearGrowth)
          const { transformedData: previousYearData, wholeYearTotal: previousYearTotal } =
            transformData(previousYearGrowth)

          // get months ex January, February, March, ...
          const currentMonth = moment().format('MMMM')
          const previousMonth = moment().subtract(1, 'months').format('MMMM')

          // get Month Data ex. Total Amount, Total Bookings per month
          const { totalAmount: currentMonthTotal } = getMonthData(currentYearData, currentMonth)

          // If current month is January use Previous Year Data
          const { totalAmount: previousMonthTotal } = getMonthData(
            currentMonth === 'January' ? previousYearData : currentYearData,
            previousMonth
          )

          // Get Current Months Data : Array
          const currentMonthData = getMonthlyAmountData(currentYearGrowth, currentMonth)

          // Calculate this weeks sales
          const currentWeekTotalAmount = getWeeklyAmount(currentMonthData, currentMonth)

          // Check if it has a previous year total, if yes currentYearTotal - previousYearTotal / previousYearTotal, if no default value is 0
          // Source for calculation : https://ascent.sba.gov/d9/c3/2afa68a841189d27ef5d9c374d85/your-business-financial-strategy-4-2-financial-kpis-tool.pdf
          const totalCurrentYearGrowth = previousYearTotal
            ? ((currentYearTotal - previousYearTotal) / previousYearTotal) * 100
            : 0

          // Check if it has a previous year total, if yes currentMonthTotal - previousMonthTotal / previousMonthTotal, if no default value is 0
          // Source for calculation : https://ascent.sba.gov/d9/c3/2afa68a841189d27ef5d9c374d85/your-business-financial-strategy-4-2-financial-kpis-tool.pdf
          const totalCurrentMonthGrowth = previousMonthTotal
            ? ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100
            : 0

          // Set State
          setWeeklyProjectedAmount(currentWeekTotalAmount)
          setCurrentYearGrowth(totalCurrentYearGrowth ? totalCurrentYearGrowth : 0)
          setCurrentMonthGrowth(totalCurrentMonthGrowth ? totalCurrentMonthGrowth : 0)
        })
        .catch(err => console.log(err))
    }
    fetchApi()
  }, [])

  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'visible',
        marginTop: { xs: 0, sm: 7.5, md: 0 }
      }}
    >
      <CardContent sx={{ padding: theme => `${theme.spacing(8.25, 7.5, 6.25, 7.5)} !important` }}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <Typography variant='h5' sx={{ mb: 6.5 }}>
              Welcome{' '}
              <Box component='span' sx={{ fontWeight: 'bold' }}>
                {firstname}
              </Box>
              ! 🎉
            </Typography>
            <Typography variant='body2'>
              We have grown {currentYearGrowth.toFixed(2)}% from last year. Our sales this month have grown{' '}
              {currentMonthGrowth.toFixed(2)}% from last month.
            </Typography>
            <Typography variant='body2'>
              Our projected sales this week is {_t('CurrencyCode')}{' '}
              {weeklyProjectedAmount?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            </Typography>
          </Grid>
          <StyledGrid item xs={12} sm={6}>
            <Img alt='Congratulations John' src='/images/cards/illustration-john-2.png' />
          </StyledGrid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default EcommerceCongratulations
