import React, { useState, useEffect } from 'react'
import { Box, Typography, Grid, Button } from '@mui/material'
import Card from '@mui/material/Card'

// import CardHeader from '@mui/material/CardHeader'
import CustomChip from 'src/@core/components/mui/chip'
import CardContent from '@mui/material/CardContent'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { useTheme } from '@mui/material/styles'
import getConfig from 'next/config'
import axios from 'axios'

import { _t } from '../../../configs/lang/translation';

const { publicRuntimeConfig } = getConfig()

import { getDaysOnWeek } from 'src/@core/utils/get-days-on-week'

interface dayGrowthType {
  day: string
  totalBooking: number
  totalAmount: number
}

const EcommerceDailyGrowth = () => {
  const [dailyGrowth, setdailyGrowth] = useState<Array<dayGrowthType>>([])
  const [latestDayGrowth, setLatestDayGrowth] = useState<number>(0)
  const [wholeWeekAmount, setWholeWeekAmount] = useState<number>(0)
  const [weekStartDate, setWeekStartDate] = useState<Date>(new Date());
  const [weekEndDate, setWeekEndDate] = useState<Date>(new Date());
  const theme = useTheme()

  useEffect(() => {
    const fetchApi = async () => {
      const serverUrl = publicRuntimeConfig.backendUrl
      const endPoint = `${serverUrl}/api/dashboard-stat/monthly-growth`
      axios
        .get(endPoint)
        .then(res => {
          // Data transformation
          const rawData = res.data.data

          // Get Dates within current week
          const currentDaysOnWeek = getDaysOnWeek(weekStartDate) // This is an array of dates starting from now counting to 7 days

          // Get all keys ['January', 'February', ...]
          const months = Object.keys(rawData)
          const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

          // get the current day
          const currentDay = days[new Date().getDay()]

          const transformedData = currentDaysOnWeek.map(item => {
            const month = months[item.getMonth()]
            const day = item.getDate()

            return {
              day: days[item.getDay()],
              totalBooking: rawData[month][day]['total_booking'],
              totalAmount: rawData[month][day]['total_amount']
            }
          })

          let wholeWeekTotal = 0

          // today/current day amount
          let todayAmount = 0

          /* transformedData.map(data => (wholeWeekTotal += data.totalAmount)) */
          // from map to forEach

          transformedData.forEach(data => {
            if (data.day === currentDay) {
              todayAmount = data.totalAmount
            }
            wholeWeekTotal += data.totalAmount
          })

          // state for the latest day amount
          setLatestDayGrowth(todayAmount)

          setdailyGrowth(transformedData)
          setWholeWeekAmount(wholeWeekTotal)
        })
        .catch(err => console.log(err))
    }
    fetchApi()

  }, [weekStartDate])

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
      categories: dailyGrowth?.map(item => item.day.substring(0, 3))
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
              columnWidth: '45%'
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '45%'
            }
          }
        }
      },
      {
        breakpoint: 430,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '55%'
            }
          }
        }
      }
    ]
  }

  const series = [
    {
      name: 'Booking Amount',
      data: dailyGrowth?.map(item => item.totalAmount)
    }
  ]
  const currencySymbol = _t("CurrencySymbol");

  // set the chip date to one week starting today
  useEffect(() => {
    weekStartDate.setDate(weekStartDate.getDate() - weekStartDate.getDay());
    weekEndDate.setDate(weekStartDate.getDate() + 6);
  }, [])

  const goToPreviousWeek = () => {

    setWeekStartDate((prevWeekStartDate: any) => {
      const newWeekStartDate = new Date(prevWeekStartDate);
      newWeekStartDate.setDate(newWeekStartDate.getDate() - 6);

      return newWeekStartDate;
    });
    setWeekEndDate((prevWeekEndDate: any) => {
      const newWeekEndDate = new Date(prevWeekEndDate);
      newWeekEndDate.setDate(newWeekEndDate.getDate() - 6);

      return newWeekEndDate;
    });

  }

  const goToNextWeek = () => {

    setWeekStartDate((prevWeekStartDate: any) => {
      const newWeekStartDate = new Date(prevWeekStartDate);
      newWeekStartDate.setDate(newWeekStartDate.getDate() + 6);

      return newWeekStartDate;
    });
    setWeekEndDate((prevWeekEndDate: any) => {
      const newWeekEndDate = new Date(prevWeekEndDate);
      newWeekEndDate.setDate(newWeekEndDate.getDate() + 6);

      return newWeekEndDate;
    });
  }

  const weekDateLabel = `${weekStartDate.toLocaleDateString()}-${weekEndDate.toLocaleDateString()}`;

  return (
    <Card>
      <Grid container spacing={12} sx={{ px: 5, pt: 3 }}>
        <Grid item xs={7} md={8}>
          <Box>
            <Typography variant="h6">{`Daily Growth: ${currencySymbol} ${latestDayGrowth
              ?.toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}</Typography>
            <Typography sx={{ fontSize: 14 }}>{`Total Week: ${currencySymbol} ${wholeWeekAmount
              ?.toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}</Typography>
          </Box>
        </Grid>
        <Grid item xs={5} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <CustomChip
              skin='light'
              size="small"
              label={weekDateLabel}
              color="secondary"
              sx={{
                height: 20,
                marginTop: 0.4,
                fontSize: '0.75rem',
                fontWeight: 600,
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
                  fontSize: '1.5rem',
                }}
                color="secondary"
                onClick={goToPreviousWeek}
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
                  fontSize: '1.5rem',
                }}
                color="secondary"
                onClick={goToNextWeek}
              >
                {'>'}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <CardContent>
        {dailyGrowth && <ReactApexcharts type="bar" height={282} series={series} options={options} />}
      </CardContent>
    </Card>
  );
};

export default EcommerceDailyGrowth;
