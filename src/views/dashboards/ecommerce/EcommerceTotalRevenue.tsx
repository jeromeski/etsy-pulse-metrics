// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import React, { useState, useEffect } from 'react'
import { _t } from '../../../configs/lang/translation'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

import { useAppDispatch, useAppSelector, RootState } from 'src/store/index'

import { getRawDataAction } from 'src/store/apps/dashboard/yearlyGrowth/yearlyAction/yearly-action'

const series = [
  {
    data: [30, 58, 45, 68]
  }
]

const EcommerceTotalRevenue = () => {
  // ** Hook
  const theme = useTheme()

  const dispatch = useAppDispatch()
  const { wholeYearAmount } = useAppSelector((state: RootState) => state.yearlyDashboard)

  useEffect(() => {
    dispatch(getRawDataAction())
  }, [dispatch])

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      dropShadow: {
        top: 12,
        blur: 3,
        left: 3,
        enabled: true,
        opacity: 0.14,
        color: theme.palette.primary.main
      }
    },
    grid: {
      show: false,
      padding: {
        left: -5,
        top: -10
      }
    },
    tooltip: { enabled: false },
    colors: [theme.palette.primary.main],
    markers: {
      size: 6,
      offsetX: -2,
      offsetY: -1,
      strokeWidth: 5,
      colors: ['transparent'],
      strokeColors: 'transparent',
      discrete: [
        {
          size: 7,
          seriesIndex: 0,
          strokeColor: theme.palette.primary.main,
          fillColor: theme.palette.background.paper,
          dataPointIndex: series[0].data.length - 1
        }
      ]
    },
    stroke: {
      width: 5,
      curve: 'smooth',
      lineCap: 'round'
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      labels: { show: false }
    }
  }

  const currencySymbol = _t('CurrencySymbol')
  return (
    <Card sx={{ position: 'relative', overflow: 'visible', marginTop: { xs: 7.5 } }}>
      <CardContent>
        <Typography
          variant='body1'
          sx={{ fontSize: '1rem', fontWeight: '600' }}
        >{`${currencySymbol} ${wholeYearAmount?.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}`}</Typography>
        <ReactApexcharts type='line' height={87} options={options} series={series} />
        <Typography
          variant='body2'
          sx={{ fontWeight: 600, textAlign: 'center', color: 'text.primary', whiteSpace: 'nowrap' }}
        >
          Total Revenue
        </Typography>
      </CardContent>
    </Card>
  )
}

export default EcommerceTotalRevenue
