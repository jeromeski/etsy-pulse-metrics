import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import React, { useEffect, useState } from 'react'
import CustomChip from 'src/@core/components/mui/chip'

import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'
import { ApexOptions } from 'apexcharts'
import getConfig from 'next/config'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

import { _t } from 'src/configs/lang/translation'

// import dispatch and selector
import { RootState, useAppDispatch, useAppSelector } from 'src/store/index'

// **interface/types
import { IMonthlyGrowthType } from 'src/store/apps/dashboard/models/yearlyTypes'

// get action from redux of yearly growth

import { getRawDataAction, getYearlyDataAction } from 'src/store/apps/dashboard/yearlyGrowth/yearlyAction/yearly-action'

const EcommerceMonthlyGrowth = () => {
  const dispatch = useAppDispatch()
  const { latestMonthGrowth, wholeYearAmount, monthlyGrowth, listOfYears } = useAppSelector(
    (state: RootState) => state.yearlyDashboard
  )

  const [year, setYear] = useState<number>(new Date().getFullYear())
  // const listOfYearAsNumbers: number[] = listOfYears?.map(Number)

  // const latestYearOfBooking = Math.max(...listOfYearAsNumbers)
  // const oldestYearOfBooking = Math.min(...listOfYearAsNumbers)

  const theme = useTheme()

  useEffect(() => {
    dispatch(getRawDataAction())
  }, [dispatch])

  const increaseYearHandler = () => {
    let yearCopy = +year
    yearCopy += 1
    // const isYearCopyIncludedInListOfYear = listOfYears?.includes(yearCopy.toString())

    setYear(yearCopy)
    dispatch(getYearlyDataAction(yearCopy))
  }
  const decreaseYearHandler = () => {
    let yearCopy = +year
    yearCopy -= 1
    // const isYearCopyIncludedInListOfYear = listOfYears?.includes(yearCopy.toString())

    setYear(yearCopy)
    dispatch(getYearlyDataAction(yearCopy))
  }

  const options: ApexOptions = {
    chart: {
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '35%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: monthlyGrowth?.map((item: IMonthlyGrowthType) => item.month.substring(0, 3))
    },
    colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.secondary.main],
    grid: {
      strokeDashArray: 7,
      padding: {
        bottom: -10
      }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 6,
      curve: 'smooth',
      lineCap: 'round',
      colors: [theme.palette.background.paper]
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '45%',
              horizontal: false
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '50%',
              horizontal: false
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '45%',
              horizontal: true
            }
          }
        }
      },
      {
        breakpoint: 430,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '40%',
              horizontal: true
            }
          }
        }
      }
    ]
  }

  const series = [
    {
      name: 'Bookings',
      data: monthlyGrowth?.map((item: IMonthlyGrowthType) => item.totalBooking)
    }
  ]

  // const currencySymbol = _t('Currency', 'Symbol')
  const currencySymbol = _t('CurrencySymbol')

  return (
    <Card>
      <Grid container spacing={12} sx={{ px: 5, pt: 3 }}>
        <Grid item xs={7} md={8}>
          <Box>
            <Typography variant='h6'>{`Monthly Growth: ${currencySymbol} ${latestMonthGrowth
              ?.toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}</Typography>
            <Typography sx={{ fontSize: 14 }}>{`Total Year: ${currencySymbol} ${wholeYearAmount
              ?.toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}</Typography>
          </Box>
        </Grid>
        <Grid item xs={5} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <CustomChip
              skin='light'
              size='small'
              label={`Year of ${year}`}
              color='secondary'
              sx={{
                height: 20,
                marginTop: 0.4,
                fontSize: '0.75rem',
                fontWeight: 600
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    color: theme.palette.primary.main,
                    backgroundColor: 'transparent'
                  },
                  minHeight: 0,
                  minWidth: 0,
                  lineHeight: 0.5,
                  paddingInline: 1,
                  paddingBlock: '5px',
                  ml: 1,
                  fontSize: '1.5rem'
                }}
                color='secondary'
                onClick={decreaseYearHandler}
              >
                {'<'}
              </Button>
              <Button
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    color: theme.palette.primary.main,
                    backgroundColor: 'transparent'
                  },
                  minHeight: 0,
                  minWidth: 0,
                  lineHeight: 0.5,
                  paddingInline: 1,
                  paddingBlock: '5px',
                  fontSize: '1.5rem'
                }}
                color='secondary'
                onClick={increaseYearHandler}
              >
                {'>'}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <CardContent>
        {monthlyGrowth && <ReactApexcharts type='bar' height={282} series={series} options={options} />}
      </CardContent>
    </Card>
  )
}

export default EcommerceMonthlyGrowth
